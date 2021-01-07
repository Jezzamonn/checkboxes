import Controller from './controller.js';

let lastTime;
let controller;

function init() {
    lastTime = Date.now();
    controller = new Controller();

    // Kick off the update loop
    window.requestAnimationFrame(everyFrame);
}

// TODO: Make tweak this to allow frame skipping for slow computers. Maybe.
function everyFrame() {
    update();
    requestAnimationFrame(everyFrame);
}

function update() {
    let curTime = Date.now();
    let dt = (curTime - lastTime) / 1000;
    controller.update(dt);
    lastTime = curTime;
}

init();