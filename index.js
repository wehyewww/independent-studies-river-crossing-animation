window.addEventListener('DOMContentLoaded', () => {

    const goat = document.querySelector('#goat');
    const animalStart = document.querySelector('#animal-start');
    const animalEnd = document.querySelector("#animal-end");
    const raftStart = document.querySelector('#raft-start');
    const raftEnd = document.querySelector('#raft-end');
    const btnStart = document.querySelector('#btn-start');

    //Resources:
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMRect
    // Gabriel Paul Tan

    // From start position to animal start
    const startPosA = getPosition(goat);
    const endPosA = getPosition(animalStart);

    // element takes in distance to travel from current position, cannot just give end position
    const distA = calcDistance(startPosA, endPosA);

    const moveAnimation = [
        { transform: `translate(${distA.x}px, ${distA.y}px)` },
    ];

    const moveTiming = {
        duration: 3000,
        fill: 'forwards' // keeps element at end position
    };

    btnStart.onclick = function () {
        goat.animate(moveAnimation, moveTiming);
    }

    function move() {

    }

    function getPosition(element) {
        var pos = element.getBoundingClientRect();

        var centerX = pos.left + pos.width / 2;
        var centerY = pos.top + pos.height / 2;

        return { x: centerX, y: centerY };
    }

    function calcDistance(start, end) {
        var distX = end.x - start.x;
        var distY = end.y - start.y;

        return { x: distX, y: distY };
    }

});

// Problem:
// With this method, diff screen sizes can cause problems
// This is because this method gets exact coordinates at point of calculation

// function to move actor to target actor
// likely return a promise cus async, think abt why

// re-organise html elements to layers
// background / actor