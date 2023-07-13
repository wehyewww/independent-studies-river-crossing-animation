window.addEventListener('DOMContentLoaded', () => {

    const goat = document.querySelector('#goat');
    const raft = document.querySelector('#raft');
    const animalStart = document.querySelector('#animal-start');
    const animalEnd = document.querySelector("#animal-end");
    const raftStart = document.querySelector('#raft-start');
    const raftEnd = document.querySelector('#raft-end');
    const btnStart = document.querySelector('#btn-start');

    btnStart.onclick = function () {
        move(goat, animalStart) // after first animation, all siao siao
            .then(() => move(goat, raft))
            .then(() => move(goat, raftEnd))
            .then(() => move(goat, animalEnd));

        // but, if different elements are animated each time, translations seem right

        // move(goat, animalStart)
        //     .then(() => move(animalStart, raft))
        //     .then(() => move(raft, raftEnd))
        //     .then(() => move(raftEnd, animalEnd));
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

        // ----- bugged version -----
        const moveAnimation = [
            { transform: `translate(${dist.x}px, ${dist.y}px)` }
        ];

        console.log(`{ transform: translate(${dist.x}px, ${dist.y}px) }`)
        // ----- bugged version -----

        // ----- fixed version ------
        // const distCurrent = getTranslation(startElement);

        // const moveAnimation = [
        //     { transform: `translate(${dist.x + distCurrent.x}px, ${dist.y + distCurrent.y}px)` }
        // ];

        // console.log(`{ transform: translate(${dist.x + distCurrent.x}px, ${dist.y + distCurrent.y}px) }`)
        // ----- fixed version ------

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