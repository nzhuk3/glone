import { Animation } from "./core.js";

export class Container {
    constructor(query, props) {
        this.elements = document.querySelectorAll(query);
        this.animations = [];

        this.elements.forEach(target => {
            this.animations.push(new Animation(target, props));
        })
    }

    stop() {
        this.animations.forEach(an => {
            an.stop();
        })
    }

    continue() {
        this.animations.forEach(an => {
            an.continue();
        })
    }

    seek(time) {
        this.animations.forEach(an => {
            an.seek(time);
        })
    }



}