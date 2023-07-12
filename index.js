window.addEventListener('DOMContentLoaded', () => {

    const goat1 = document.querySelector('#goat1');
    const goat2 = document.querySelector('#goat2');
    const goat3 = document.querySelector('#goat3');
    const lion1 = document.querySelector('#lion1');
    const lion2 = document.querySelector('#lion2');
    const lion3 = document.querySelector('#lion3');
    const goat1Start = document.querySelector('#goat1-start');
    const goat2Start = document.querySelector('#goat2-start');
    const goat3Start = document.querySelector('#goat3-start');
    const lion1Start = document.querySelector('#lion1-start');
    const lion2Start = document.querySelector('#lion2-start');
    const lion3Start = document.querySelector('#lion3-start');
    const goat1End = document.querySelector('#goat1-end');
    const goat2End = document.querySelector('#goat2-end');
    const goat3End = document.querySelector('#goat1-end');
    const lion1End = document.querySelector('#lion1-end');
    const lion2End = document.querySelector('#lion2-end');
    const lion3End = document.querySelector('#lion3-end');
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

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    //Resources:
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMRect
    // Gabriel Paul Tan

    btnStart.onclick = function () {
        // move(goat, animalStart)
        //     .then(() => move(goat, raftStartTop))
        //     .then(() => move(goat, raftEndTop))
        //     .then(() => move(goat, animalEnd));

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

        console.log("startPos: ", startPos);
        console.log("endPos: ", endPos);

        // get distance to travel
        const dist = calcDistance(startPos, endPos);

        // get total distance travelled so far
        const distCurrent = getTranslation(startElement);

        const moveAnimation = [
            { transform: `translate(${dist.x + distCurrent.x}px, ${dist.y + distCurrent.y}px)` }
        ];

        console.log(`{ transform: translate(${dist.x + distCurrent.x}px, ${dist.y + distCurrent.y}px) }`)

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
});