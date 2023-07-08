window.addEventListener('DOMContentLoaded', () => {

    const goat = document.querySelector('#goat');
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
        move(goat, animalStart)
            .then(() => move(goat, raftStartTop))
            .then(() => move(goat, raftEndTop))
            .then(() => move(goat, animalEnd));
    }

    // translate happens from the original position
    function move(startElement, endElement) {

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
            duration: 2000,
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