window.addEventListener('DOMContentLoaded', () => {

    const goat = document.querySelector('#goat');
    const animalEnd = document.querySelector("#animal-end");
    const btnStart = document.querySelector('#btn-start');

    //Resources:
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMRect
    // Gabriel Paul Tan

    const startPos = getPosition(goat);
    const endPos = getPosition(animalEnd);

    // element takes in distance to travel from current position, cannot just give end position
    const translateX = endPos.x - startPos.x;
    const translateY = endPos.y - startPos.y;

    const moveAnimation = [
        { transform: `translate(${translateX}px, ${translateY}px)` }
    ];

    const moveTiming = {
        duration: 2000,
        fill: 'forwards' // keeps element at end position
    };

    btnStart.onclick = function (e) {
        goat.animate(moveAnimation, moveTiming);
    }

    function getPosition(element) {
        var pos = element.getBoundingClientRect();

        var centerX = pos.left + pos.width / 2;
        var centerY = pos.top + pos.height / 2;

        return { x: centerX, y: centerY };
    }

});

// TODO:
// 1. Create function to calculate center coordinates (will need to be re-used many times)
// 2. Make Goat move from original pos -> animal start -> raft start -> raft end -> animal end
// 3. Group animations? Make raft move with Goat
// Problem:
// With this method, diff screen sizes can cause problems
// This is because this method gets exact coordinates at point of calculation