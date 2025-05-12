import {gsap} from "../node_modules/gsap/all.js";
import { Power4 } from "../node_modules/gsap/all.js";
import { animateTo } from "./lib/lib.js";
import { quad } from "./lib/ease.js";




const cssProperties = {
    // color: "blue",
    // backgroundColor: "lightgray",
    // fontSize: "16px",
    // fontFamily: "'Arial', sans-serif",
    // fontWeight: "bold",
    // lineHeight: "1.5",
    // textAlign: "center",
    // margin: "20px",
    // padding: "10px",
    // border: "12px solid black",
    // borderRadius: "5px",
    // top: "10px",
    // boxShadow: "4px 4px 1px rgb(255, 0, 0)",
    // opacity: "0.8",
  };
  

document.querySelector('#id1').addEventListener('click', (event) => {
    event.preventDefault();
    console.log('clicked');
    // const a = gsap.to(".target",{ ...{
    //     ease: "none",
    //     duration: 2.5,
    //     margin: 10,
    //     border: "12px dotted rgb(255, 255, 0)",
    //     scale: 1.5,
    //     y: -250,
    //     x: 200,
    //     rotate: 120,
    // }, ...cssProperties});

    
    // setTimeout(() => {
    //     a.pause()
        
    // }, 100);
   


    const b = animateTo('.target',{ ...{
        ease: quad,
        duration: 2.5,
        y: -250,
        x: 200,
        rotate: 120,
        border: "12px dotted rgb(255, 255, 0)",
        margin: '10',
        scale: 1.5,
    }, ...cssProperties})

    // setTimeout(() => a.stop(), 500);

    // setTimeout(() => a.continue(), 3000);
})







