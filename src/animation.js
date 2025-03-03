function animate({timing, draw, duration}) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(resolve, duration)
    })
  
    let start = performance.now();
  
    requestAnimationFrame(function animate(time) {
      // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;
  
    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);
  
    draw(progress); // отрисовать её
  
    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });

  return promise;
}

const elem = document.getElementById('elem');
      
elem.onclick = function() {
    const promise = animate({
        duration: 3000,
        timing: quad,
        draw: function(progress) {
          console.log(progress);
          elem.style.width = `${progress * 100}%`;
        }
    });
    promise.then(() => {
      elem.onclick = function() {
            animate({
            duration: 3000,
            timing: quad,
            draw: function(progress) {
              console.log(progress);
              elem.style.width = `${(1 - progress) * 100}%`;
            }
        }); 
    }})
};
  
function quad(timeFraction) {
    return Math.pow(timeFraction, 2)
}
  
function circ(timeFraction) {
    return 1 - Math.sin(Math.acos(timeFraction));
}

function back(timeFraction, x = 2) {
    return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
}

function elastic(timeFraction, x = 2) {
    return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction)
}
  
function makeEaseOut(timing) {
    return function(timeFraction) {
      return 1 - timing(1 - timeFraction);
    }
}