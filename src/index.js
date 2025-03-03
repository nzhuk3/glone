import {gsap} from "../node_modules/gsap/all.js";
import { Power4 } from "../node_modules/gsap/all.js";
import { animateTo } from "./lib/lib.js";
import { quad } from "./lib/ease.js";











document.querySelector('#id1').addEventListener('click', (event) => {
    event.preventDefault();

    // const a = gsap.to(".target-red", {
    //     duration: 10,
    //     ease: "none",
    //     duration: 2.5,
    //         y: -250,
    //         x: 200,
    //         rotate: 120,
    //         margin: 10,
    //         border: '12px dotted rgb(255, 255, 0)',
    //   });

    // setTimeout(() => {console.log(a);}, 1000)
    console.log('clicked');
    animateTo(document.querySelector('.target-red'), {
        ease: quad,
        duration: 2.5,
        y: -250,
        x: 200,
        rotate: 120,
        margin: 10,
        border: '12px dotted rgb(255, 255, 0)',
    })
    
})







