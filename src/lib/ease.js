export function quad(timeFraction) {
    return Math.pow(timeFraction, 2);
}
  
// export function circ(timeFraction) {
//     return 1 - Math.sin(Math.acos(timeFraction));
// }

export function back(timeFraction, x = 2) {
    return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
}

// export function elastic(timeFraction, x = 2) {
//     return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction)
// }
  
export function makeEaseOut(timing) {
    return function(timeFraction) {
      return 1 - timing(1 - timeFraction);
    }
}