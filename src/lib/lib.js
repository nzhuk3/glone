import Timeline from "./Ticker.js";
import { AnimationContainer } from "./animationContainer.js";



export function animateTo(query, vars) {
    const c = new AnimationContainer();
    c.animateDefault(query, vars, 1);
    console.log(c);
    return c;
}

export function animateFrom(query, vars) {
    return new AnimationContainer(query, vars, 2);
}