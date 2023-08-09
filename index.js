window.addEventListener('DOMContentLoaded', () => {

    // const goat1 = document.querySelector('#goat1');
    // const lion1 = document.querySelector('#lion1');
    // const goat1End = document.querySelector('#goat1-end');
    // const lion1End = document.querySelector('#lion1-end');
    const raft = document.querySelector('#raft');
    const animalStart = document.querySelector('#animal-start');
    const animalEnd = document.querySelector("#animal-end");
    const raftStart = document.querySelector('#raft-start');
    const raftEnd = document.querySelector('#raft-end');
    const raftStartTop = document.querySelector('#raft-start-top');
    const raftStartBottom = document.querySelector('#raft-start-bottom');
    const raftEndTop = document.querySelector('#raft-end-top');
    const raftEndBottom = document.querySelector('#raft-end-bottom');
    const btnStart = document.querySelector('#btn-start');
    const startGrid = document.querySelector('#left-grid');
    const endGrid = document.querySelector('#right-grid');

    //Resources:
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMRect
    // Gabriel Paul Tan

    btnStart.onclick = function () {
        generateAnimals();
        // move(goat, animalStart)
        //     .then(() => move(goat, raftStartTop))
        //     .then(() => move(goat, raftEndTop))
        //     .then(() => move(goat, animalEnd));

        const goat1 = document.querySelector('#G1');
        const lion1 = document.querySelector('#L1');
        const goat1End = document.querySelector('#G1-end');
        const lion1End = document.querySelector('#L1-end');

        move(goat1, animalStart, 1000)
            .then(() => move(goat1, raftStartTop, 1000))
            .then(() => move(lion1, animalStart, 1000))
            .then(() => move(lion1, raftStartBottom, 1000))
            .then(() => {
                return Promise.all([move(goat1, raftEndTop), move(lion1, raftEndBottom), move(raft, raftEnd)])
            })
            .then(() => move(goat1, animalEnd, 1000))
            .then(() => move(goat1, goat1End, 1000))
            .then(() => move(lion1, animalEnd, 1000))
            .then(() => move(lion1, lion1End, 1000));
    }

    // translate happens from the original position
    function move(startElement, endElement, time = 2000) {

        // get start and end coordinates
        const startPos = getPosition(startElement);
        const endPos = getPosition(endElement);

        // console.log("startPos: ", startPos);
        // console.log("endPos: ", endPos);

        // get distance to travel
        const dist = calcDistance(startPos, endPos);

        // get total distance travelled so far
        const distCurrent = getTranslation(startElement);

        const moveAnimation = [
            { transform: `translate(${dist.x + distCurrent.x}px, ${dist.y + distCurrent.y}px)` }
        ];

        // console.log(`{ transform: translate(${dist.x + distCurrent.x}px, ${dist.y + distCurrent.y}px) }`)

        const moveTiming = {
            duration: time,
            fill: 'forwards' // keeps element at end position
        };

        const animation = startElement.animate(moveAnimation, moveTiming);

        return animation.finished;
    }

    function getPosition(element) {
        var pos = element.getBoundingClientRect();

        var centerX = (pos.left + pos.width / 2);
        var centerY = (pos.top + pos.height / 2);

        return { x: centerX, y: centerY };
    }

    function calcDistance(start, end) {
        var distX = end.x - start.x;
        var distY = end.y - start.y;

        return { x: distX, y: distY };
    }

    function getTranslation(element) {
        const computedStyle = window.getComputedStyle(element);
        const transformValue = computedStyle.transform;

        // regex to capture X and Y translation in group
        const getValue = transformValue.match(/matrix\(1, 0, 0, 1, (-?\d*\.?\d+), (-?\d*\.?\d+)/);

        if (!getValue) {
            return { x: 0, y: 0 };
        }

        const translateX = parseFloat(getValue[1]);
        const translateY = parseFloat(getValue[2]);

        return { x: translateX, y: translateY };
    }

    function generateAnimals() {
        const goat = 'G';
        const lion = 'L';
        const start = 'start';
        const end = 'end';
        const numGoat = Math.floor(Math.random() * (8 - 1 + 1) + 1);
        const numLion = Math.floor(Math.random() * (numGoat - 1 + 1) + 1); // lions must never start higher than goats

        console.log(numGoat);
        console.log(numLion);

        for (let i = 0; i < numGoat; i++) {
            const goatStartElement = createAnimalContainer(goat, i + 1, start);
            startGrid.appendChild(goatStartElement);
            const goatElement = createAnimals(goat, i + 1);
            goatStartElement.appendChild(goatElement);

            const goatEndElement = createAnimalContainer(goat, i + 1, end);
            endGrid.appendChild(goatEndElement);
        }

        for (let i = 0; i < numLion; i++) {
            const lionStartElement = createAnimalContainer(lion, i + 1, start);
            startGrid.appendChild(lionStartElement);
            const lionElement = createAnimals(lion, i + 1);
            lionStartElement.appendChild(lionElement);

            const lionEndElement = createAnimalContainer(lion, i + 1, end);
            endGrid.appendChild(lionEndElement);
        }
    }

    function createAnimalContainer(animal, index, pos) {
        const animalContainerElement = document.createElement('div');
        animalContainerElement.id = pos == 'start' ? animal + index + '-start' : animal + index + '-end';
        return animalContainerElement;
    }

    function createAnimals(animal, index) {
        const animalElement = document.createElement('div');
        animalElement.className = animal;
        animalElement.id = animal + index;
        animalElement.innerHTML = animal == 'G' ? '&#x1F984' : '&#x1F981';
        return animalElement;
    }
});