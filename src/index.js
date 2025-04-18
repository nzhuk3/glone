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
    // border: "1px solid black",
    borderRadius: "5px",
    width: "100px",
    // height: "auto",
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    // position: "relative",
    // top: "10px",
    // boxShadow: "4px 4px 1px rgb(255, 0, 0)",
    // opacity: "0.8"
  };
  

document.querySelector('#id1').addEventListener('click', (event) => {
    event.preventDefault();
    // const a = gsap.to(".target-red",{ ...{
    //     duration: 10,
    //     ease: "none",
    //     duration: 2.5,
    //         y: -250,
    //         x: 200,
    //         rotate: 120,
    //         margin: 10,
    //         border: '12px dotted rgb(255, 255, 0)',
    //   }, ...cssProperties});

    // setTimeout(() => {console.log(a);}, 500)
    console.log('clicked');
    animateTo(document.querySelector('.target-red'),{ ...{
        ease: quad,
        duration: 2.5,
        y: -250,
        x: 200,
        border: "12px dotted rgb(255, 255, 0)",
        margin: 10,
        rotate: 120,
        scale: 1.5,
        skewX: 20
    }, ...cssProperties})
})







