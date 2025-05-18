import Timeline from "./Ticker.js";
import { AnimationContainer } from "./animationContainer.js";


export function animateTo(query, vars) {
    const c = new AnimationContainer().animateDefault(query, vars, 1);
    console.log(c);
    return c;
}

export function animateFrom(query, vars) {
    return new AnimationContainer().animateDefault(query, vars, 2);
}

export class Sequence {    
    constructor(params) {
        this.parama = params;
        this.container = new AnimationContainer();
    }

    add(query, props, delay) {
        this.container.sequence(query, props, delay);
    }
}