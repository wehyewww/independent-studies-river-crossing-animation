window.addEventListener('DOMContentLoaded', () => {

    const goat = document.querySelector('#goat');
    const animalStart = document.querySelector('#animal-start');
    const animalEnd = document.querySelector("#animal-end");
    const raftStart = document.querySelector('#raft-start');
    const raftEnd = document.querySelector('#raft-end');
    const btnStart = document.querySelector('#btn-start');

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let totalX = 0;
    let totalY = 0;

    //Resources:
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMRect
    // Gabriel Paul Tan

    btnStart.onclick = function () {
        move(goat, animalStart) // same issue with multiple animations
            .then(() => move(goat, raftStart))
            .then(() => move(goat, raftEnd))
            .then(() => move(goat, animalEnd))
            .then(() => clearDistance());
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

        const moveAnimation = [
            { transform: `translate(${dist.x + totalX}px, ${dist.y + totalY}px)` }
        ];

        trackDistance(dist.x, dist.y);
        console.log(`{ transform: translate(${dist.x}px, ${dist.y}px) }`)

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

    function trackDistance(x, y) {
        totalX += x;
        totalY += y;
    }

    function clearDistance() {
        totalX = 0;
        totalY = 0;
    }

});

// Problem:
// With this method, diff screen sizes can cause problems
// This is because this method gets exact coordinates at point of calculation