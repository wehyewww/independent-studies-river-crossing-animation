window.addEventListener('DOMContentLoaded', () => {

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

    const leftBank = [];
    const rightBank = [];

    var numGoat;
    var numLion;

    //Resources:
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMRect
    // Gabriel Paul Tan

    btnStart.onclick = function () {
        generateAnimals();
        var animal1 = getStartAnimal('G', 'L'); // animal, bank
        var endPos1 = getEndPosition(animal1, 'L'); // new animal, bank

        var animal2 = getStartAnimal('L', 'L');
        var endPos2 = getEndPosition(animal2, 'L');

        var idAnimal1 = '#' + animal1;
        var idAnimal2 = '#' + animal2;
        var idEndPos1 = '#' + endPos1;
        var idEndPos2 = '#' + endPos2;

        const a1 = document.querySelector(idAnimal1);
        const a2 = document.querySelector(idAnimal2);
        const a1End = document.querySelector(idEndPos1);
        const a2End = document.querySelector(idEndPos2);

        var animal3 = getStartAnimal('G', 'R'); // animal, bank
        var endPos3 = getEndPosition(animal3, 'R'); // new animal, bank

        var animal4 = getStartAnimal('L', 'R');
        var endPos4 = getEndPosition(animal4, 'R');

        var idAnimal3 = '#' + animal3;
        var idAnimal4 = '#' + animal4;
        var idEndPos3 = '#' + endPos3;
        var idEndPos4 = '#' + endPos4;

        const a3 = document.querySelector(idAnimal3);
        const a4 = document.querySelector(idAnimal4);
        const a3End = document.querySelector(idEndPos3);
        const a4End = document.querySelector(idEndPos4);

        // move(a1, animalStart, 1000)
        //     .then(() => move(a1, raftStartTop, 1000))
        //     .then(() => move(a2, animalStart, 1000))
        //     .then(() => move(a2, raftStartBottom, 1000))
        //     .then(() => {
        //         return Promise.all([move(a1, raftEndTop), move(a2, raftEndBottom), move(raft, raftEnd)])
        //     })
        //     .then(() => move(a1, animalEnd, 1000))
        //     .then(() => move(a1, a1End, 1000))
        //     .then(() => move(a2, animalEnd, 1000))
        //     .then(() => move(a2, a2End, 1000));

        move(a1, animalStart, 1000)
            .then(() => move(a1, raftStartTop, 1000))
            .then(() => move(a2, animalStart, 1000))
            .then(() => move(a2, raftStartBottom, 1000))
            .then(() => {
                return Promise.all([move(a1, raftEndTop), move(a2, raftEndBottom), move(raft, raftEnd)])
            })
            .then(() => move(a1, animalEnd, 1000))
            .then(() => move(a1, a1End, 1000))
            .then(() => move(a2, animalEnd, 1000))
            .then(() => move(a2, a2End, 1000))
            .then(() => move(a3, animalEnd, 1000))
            .then(() => move(a3, raftEndTop, 1000))
            .then(() => move(a4, animalEnd, 1000))
            .then(() => move(a4, raftEndBottom, 1000))
            .then(() => {
                return Promise.all([move(a3, raftStartTop), move(a4, raftStartBottom), move(raft, raftStart)])
            })
            .then(() => move(a3, animalStart, 1000))
            .then(() => move(a3, a3End, 1000))
            .then(() => move(a4, animalStart, 1000))
            .then(() => move(a4, a4End, 1000));
    }

    // translate happens from the original position
    function move(startElement, endElement, time = 2000) {

        // get start and end coordinates
        const startPos = getPosition(startElement);
        const endPos = getPosition(endElement);

        // get distance to travel
        const dist = calcDistance(startPos, endPos);

        // get total distance travelled so far
        const distCurrent = getTranslation(startElement);

        const moveAnimation = [
            { transform: `translate(${dist.x + distCurrent.x}px, ${dist.y + distCurrent.y}px)` }
        ];

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
        const animal = 'A';
        const goat = 'G';
        const lion = 'L';
        const start = 'start';
        const end = 'end';
        numGoat = Math.floor(Math.random() * (8 - 1 + 1) + 1);
        numLion = Math.floor(Math.random() * (numGoat - 1 + 1) + 1); // lions must never start higher than goats

        console.log(numGoat);
        console.log(numLion);

        for (let i = 0; i < numGoat; i++) {
            const goatStartElement = createAnimalContainer(animal, i + 1, start);
            startGrid.appendChild(goatStartElement);
            const goatElement = createAnimals(goat, i + 1);
            goatStartElement.appendChild(goatElement);

            const goatEndElement = createAnimalContainer(animal, i + 1, end);
            endGrid.appendChild(goatEndElement);

            leftBank.push(goat + (i + 1));
            rightBank.push(null);
        }

        for (let i = 0; i < numLion; i++) {
            const lionStartElement = createAnimalContainer(animal, i + 1 + numGoat, start);
            startGrid.appendChild(lionStartElement);
            const lionElement = createAnimals(lion, i + 1);
            lionStartElement.appendChild(lionElement);

            const lionEndElement = createAnimalContainer(animal, i + 1 + numGoat, end);
            endGrid.appendChild(lionEndElement);

            leftBank.push(lion + (i + 1));
            rightBank.push(null);
        }

        console.log(leftBank)
        console.log(rightBank)
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

    // get the first available animal in respective array
    // bank refers to current raft position : LEFT or RIGHT
    // also empties the selected animal position in the current bank
    function getStartAnimal(animal, bank) {
        var animalID;

        if (bank == 'L') {
            for (let i = 0; i < leftBank.length; i++) {
                if (leftBank[i] != null && leftBank[i].charAt(0) == animal) {
                    console.log('Found animal for leftBank at index: ' + i)
                    animalID = leftBank[i];
                    leftBank[i] = null; // empty the value
                    return animalID; // return index of selected animal
                }
            }
        } else if (bank == 'R') {
            for (let i = 0; i < rightBank.length; i++) {
                if (rightBank[i] != null && rightBank[i].charAt(0) == animal) {
                    console.log('Found animal for rightBank at index: ' + i)
                    animalID = rightBank[i];
                    rightBank[i] = null; // empty the value
                    return animalID;
                }
            }
        }

        console.log('Impossible move found!');
        return null;
    }

    // get the first available empty space in respective array
    // bank refers to current raft position : LEFT or RIGHT
    // also populates the opposite bank with the corresponding new animal
    function getEndPosition(animal, bank) {
        var animalPos;

        // if currently on right, end position is left
        if (bank == 'R') {
            for (let i = 0; i < leftBank.length; i++) {
                if (leftBank[i] == null) {
                    console.log('Found empty for leftBank at index: ' + i)
                    animalPos = 'A' + (i + 1) + '-start';
                    leftBank[i] = animal; // populate with new animal
                    return animalPos; // return index of selected animal
                }
            }
        } else if (bank == 'L') { // if currently on left, end position is right
            for (let i = 0; i < rightBank.length; i++) {
                if (rightBank[i] == null) {
                    console.log('Found empty for rightBank at index: ' + i)
                    animalPos = 'A' + (i + 1) + '-end';
                    rightBank[i] = animal; // populate with new animal
                    return animalPos;
                }
            }
        }

        console.log('Impossible move found!');
        return null;
    }
});