import { gsap } from "../node_modules/gsap/all.js";
import { Power4 } from "../node_modules/gsap/all.js";
import { animateTo, animateFrom} from "./lib/lib.js";
import { AnimationContainer as Sequence} from "./lib/animationContainer.js";
import { easeCubicIn, easeSineIn } from "./lib/ease.js";
import { Timeline } from "../node_modules/gsap/gsap-core.js";




const cssProperties = {
    //color: "blue",
    //backgroundColor: "lightgray",
    //fontSize: "16px",
    //fontFamily: "'Arial', sans-serif",
    //fontWeight: "bold",
    //lineHeight: "1.5",
    //textAlign: "center",
    //margin: "20px",
    //padding: "10px",
    //border: "12px solid black",
    //borderRadius: "5px",
    //boxShadow: "4px 4px 1px rgb(255, 0, 0)",
    //opacity: "0.8",
};
  

document.querySelector('#id1').addEventListener('click', (event) => {
    event.preventDefault();
    console.log('clicked');
    // const a = gsap.to(".target-yellow",{ ...{
    //     ease: "power2.in",
    //     duration: 1,
    //     //delay: 1,
    //     stagger: 0.2,
    //     //margin: 10,
    //     //border: "12px dotted rgb(255, 255, 0)",
    //     //scale: 1.5,
    //     //y: -250,
    //     x: 400,
    //     //rotate: 120,
    // }, ...cssProperties});

    
    // setTimeout(() => {
    //     a.seek(0.5);
    // }, 3000);

    // const b = gsap.timeline();
    // b.to('.target-yellow', {x: 400, duration: 1, stagger: 0.2}, '1');
    // b.to('.target-blue', {x: 300, duration: 1}, '+=1');
    // b.to('.target-yellow', {x: 500, duration: 1}, '+=2');

    // setTimeout(() => {
    //     console.log('restarted');
    //     b.restart();
    // }, 4000);
   


    // const b = animateTo('.target-yellow',{ ...{
    //     ease: easeCubicIn,
    //     duration: 1,
    //     //y: 250,
    //     x: 400,
    //     stagger: 0.2,
    //     //rotate: 180,
    //     //border: "12px dotted rgb(255, 255, 0)",
    //     //margin: '10',
    //     scale: 1.5,
    // }, ...cssProperties});


    // setTimeout(() => b.pause(), 900);

    // setTimeout(() => b.seek(0.1), 2000);

    // setTimeout(() => b.seek(0.8), 2100);

    // setTimeout(() => b.seek(0.3), 2200);

    // setTimeout(() => b.play(), 3000);

    // setTimeout(() => {
    //     const c = animateTo('.target-blue',{ ...{
    //     ease: easeCubicIn,
    //     duration: 1,
    //     delay: 3,
    //     //y: 250,
    //     x: 200,
    //     //rotate: 120,
    //     //border: "12px dotted rgb(255, 255, 0)",
    //     //margin: '10',
    //     scale: 1,
    // }, ...cssProperties})
    // }, 2000);


    



    const s = new Sequence();
    s.add('.target-yellow', {x: 400, duration: 1}, 0);
    s.add('.target-blue', {x: 300, duration: 1}, 0);
    s.add('.target-yellow', {x: 500, duration: 1}, 1);

    setTimeout(() => s.seek(0.5), 2000);

    

    // setTimeout(() => s.continue(), 3000);
})







