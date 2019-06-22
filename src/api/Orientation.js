let state = {
    orientation: {
        alpha: 0,
        beta: 0,
        gamma: 0
    }
};

export default class Orientation {
    static startOrientationListener() {
        handleOrientation();
        window.addEventListener('devicemotion', handleAcceleration);
        window.addEventListener('orientationchange', handleOrientation);
        state.updateInterval = setInterval(updateOrientation, 16);
    }

    static stopOrientationListener() {
        window.removeEventListener('devicemotion', handleAcceleration);
        window.removeEventListener('orientationchange', handleOrientation);
        clearInterval(state.updateInterval);
    }

    static resetOrientation() {
        state.orientation = {alpha: 0, beta: 0, gamma: 0};
    }

    static setOrientationListener(listener) {
        state.listener = listener;
    }
}

function handleOrientation(event) {
    const {orientation} = window;
    state.landscape = orientation === 90 || orientation === -90;
}

function handleAcceleration(event) {
    const acceleration = event.acceleration;
    state.rotation = event.rotationRate || null;
    let {x, y, z} = acceleration;

    x = (state.landscape ? y : x);
    y = (state.landscape ? x : y);
    z = z * 1;

    state.position = {
        x, y, z
    };
}


function updateOrientation() {
    const rotation = state.rotation;
    if (!rotation || !state.listener) {
        return;
    }

    let {alpha, beta, gamma} = state.orientation;

    const FRAME_RATE = 62.5;
    alpha += rotation.alpha / FRAME_RATE;
    beta += rotation.beta / FRAME_RATE;
    gamma += rotation.gamma / FRAME_RATE;

    state.orientation = {
        alpha, beta, gamma
    };

    state.listener(state.orientation);
}