import Timeline from "./Ticker.js";
import { Container } from "./container.js";


export function animateTo(query, vars) {
    return new Container(query, vars)
}