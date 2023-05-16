// this file is solely for demo on friday (to show the scuffed flying Goat)
// note: rmb to change script in index.html!

window.addEventListener('DOMContentLoaded', () => {

    const goat = document.querySelector('#goat');
    const animalEnd = document.querySelector("#animal-end");
    const btnStart = document.querySelector('#btn-start');

    //Resources:
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMRect
    // Gabriel Paul Tan

    // returns an object which holds info on position of element
    const startPos = goat.getBoundingClientRect();
    const endPos = animalEnd.getBoundingClientRect();

    const centerStartX = startPos.left + startPos.width / 2;
    const centerStartY = startPos.top + startPos.height / 2;
    const centerEndX = endPos.left + endPos.width / 2;
    const centerEndY = endPos.top + endPos.height / 2;

    // element takes in distance to travel from current position, cannot just give end position
    const translateX = centerEndX - centerStartX;
    const translateY = centerEndY - centerStartY;

    console.log(centerStartX);
    console.log(centerStartY);

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

});