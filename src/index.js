import { gsap } from "../node_modules/gsap/all.js";
import { Power4 } from "../node_modules/gsap/all.js";
import { animateTo, animateFrom, Sequence } from "./lib/lib.js";
import { easeCubicIn, easeSineIn } from "./lib/ease.js";




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
    //     //stagger: 0.2,
    //     //margin: 10,
    //     //border: "12px dotted rgb(255, 255, 0)",
    //     //scale: 1.5,
    //     //y: -250,
    //     x: 200,
    //     //rotate: 120,
    // }, ...cssProperties});

    
    // setTimeout(() => {
    //     a.pause()
        
    // }, 100);
   


    // const b = animateTo('.target-yellow',{ ...{
    //     ease: easeCubicIn,
    //     duration: 1,
    //     //y: 250,
    //     x: 400,
    //     //stagger: 0.2,
    //     rotate: 180,
    //     //border: "12px dotted rgb(255, 255, 0)",
    //     //margin: '10',
    //     scale: 1.5,
    // }, ...cssProperties})

    // const c = animateTo('.target-yellow',{ ...{
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



    const s = new Sequence();
    s.add('.target-yellow', {x: 200, duration: 1}, 0);
    s.add('.target-blue', {x: 200, duration: 1}, -0.5);
    s.add('.target-yellow', {x: 500, duration: 1}, 2);

    // setTimeout(() => a.stop(), 500);

    // setTimeout(() => a.continue(), 3000);
})







