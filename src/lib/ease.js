// GSAP-like easing functions, input p in [0,1], output eased value

// 1. Linear
function easeLinear(p) {
  return p;
}

// 2. Power (Quad=2, Cubic=3, Quart=4, Quint=5, Strong=6)
function makePowerIn(power) {
  return p => Math.pow(p, power);
}

function makePowerOut(power) {
  return p => 1 - Math.pow(1 - p, power);
}

function makePowerInOut(power) {
  return p => p < 0.5
    ? Math.pow(p * 2, power) / 2
    : 1 - Math.pow((1 - p) * 2, power) / 2;
}

const easeQuadIn    = makePowerIn(2);
const easeQuadOut   = makePowerOut(2);
const easeQuadInOut = makePowerInOut(2);

const easeCubicIn    = makePowerIn(3);
const easeCubicOut   = makePowerOut(3);
const easeCubicInOut = makePowerInOut(3);

const easeQuartIn    = makePowerIn(4);
const easeQuartOut   = makePowerOut(4);
const easeQuartInOut = makePowerInOut(4);

const easeQuintIn    = makePowerIn(5);
const easeQuintOut   = makePowerOut(5);
const easeQuintInOut = makePowerInOut(5);

const easeStrongIn    = makePowerIn(6);
const easeStrongOut   = makePowerOut(6);
const easeStrongInOut = makePowerInOut(6);

// 3. Sine
function easeSineIn(p) {
  return 1 - Math.cos((p * Math.PI) / 2);
}

function easeSineOut(p) {
  return Math.sin((p * Math.PI) / 2);
}

function easeSineInOut(p) {
  return -(Math.cos(Math.PI * p) - 1) / 2;
}

// 4. Expo
function easeExpoIn(p) {
  return p === 0 ? 0 : Math.pow(2, 10 * (p - 1));
}

function easeExpoOut(p) {
  return p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
}

function easeExpoInOut(p) {
  if (p === 0) return 0;
  if (p === 1) return 1;
  return p < 0.5
    ? Math.pow(2, 20 * p - 10) / 2
    : (2 - Math.pow(2, -20 * p + 10)) / 2;
}

// 5. Circ
function easeCircIn(p) {
  return 1 - Math.sqrt(1 - Math.pow(p, 2));
}

function easeCircOut(p) {
  return Math.sqrt(1 - Math.pow(p - 1, 2));
}

function easeCircInOut(p) {
  return p < 0.5
    ? (1 - Math.sqrt(1 - Math.pow(2 * p, 2))) / 2
    : (Math.sqrt(1 - Math.pow(-2 * p + 2, 2)) + 1) / 2;
}

// 6. Back (overshoot = 1.70158)
function easeBackIn(p, overshoot = 1.70158) {
  return p * p * ((overshoot + 1) * p - overshoot);
}

function easeBackOut(p, overshoot = 1.70158) {
  return (--p * p * ((overshoot + 1) * p + overshoot) + 1);
}

function easeBackInOut(p, overshoot = 1.70158) {
  const s = overshoot * 1.525;
  if ((p *= 2) < 1) {
    return (p * p * ((s + 1) * p - s)) / 2;
  }
  return ((p -= 2) * p * ((s + 1) * p + s) + 2) / 2;
}

// 7. Elastic (amplitude=1, period=0.3)
function easeElasticIn(p, amplitude = 1, period = 0.3) {
  if (p === 0 || p === 1) return p;
  const s = period / (2 * Math.PI) * Math.asin(1 / amplitude);
  return -(
    amplitude * Math.pow(2, 10 * (p - 1)) *
    Math.sin((p - 1 - s) * (2 * Math.PI) / period)
  );
}

function easeElasticOut(p, amplitude = 1, period = 0.3) {
  if (p === 0 || p === 1) return p;
  const s = period / (2 * Math.PI) * Math.asin(1 / amplitude);
  return (
    amplitude * Math.pow(2, -10 * p) *
    Math.sin((p - s) * (2 * Math.PI) / period)
  ) + 1;
}

function easeElasticInOut(p, amplitude = 1, period = 0.45) {
  if (p === 0 || p === 1) return p;
  const s = period / (2 * Math.PI) * Math.asin(1 / amplitude);
  p = p * 2;
  if (p < 1) {
    return (
      -0.5 * amplitude *
      Math.pow(2, 10 * (p - 1)) *
      Math.sin((p - 1 - s) * (2 * Math.PI) / period)
    );
  }
  return (
    amplitude * Math.pow(2, -10 * (p - 1)) *
    Math.sin((p - 1 - s) * (2 * Math.PI) / period) * 0.5
  ) + 1;
}

// 8. Bounce
function bounceOut(p) {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (p < 1 / d1) {
    return n1 * p * p;
  } else if (p < 2 / d1) {
    return n1 * (p -= 1.5 / d1) * p + 0.75;
  } else if (p < 2.5 / d1) {
    return n1 * (p -= 2.25 / d1) * p + 0.9375;
  }
  return n1 * (p -= 2.625 / d1) * p + 0.984375;
}

function easeBounceIn(p) {
  return 1 - bounceOut(1 - p);
}

function easeBounceOut(p) {
  return bounceOut(p);
}

function easeBounceInOut(p) {
  return p < 0.5
    ? (1 - bounceOut(1 - 2 * p)) / 2
    : (bounceOut(2 * p - 1) + 1) / 2;
}

// 9. Stepped Ease (steps, immediateStart)
function easeSteps(p, steps = 1, immediateStart = false) {
  const p2 = Math.min(Math.max(p, 0), 0.999999) * steps;
  return ((immediateStart ? Math.ceil(p2) : Math.floor(p2)) + (immediateStart ? 0 : 1)) / steps;
}


// Example usage:
// let v = gsapEases.easeCubicInOut(0.5); // 0.5 -> eased value

export {
  easeLinear,
  easeQuadIn, easeQuadOut, easeQuadInOut,
  easeCubicIn, easeCubicOut, easeCubicInOut,
  easeQuartIn, easeQuartOut, easeQuartInOut,
  easeQuintIn, easeQuintOut, easeQuintInOut,
  easeStrongIn, easeStrongOut, easeStrongInOut,
  easeSineIn, easeSineOut, easeSineInOut,
  easeExpoIn, easeExpoOut, easeExpoInOut,
  easeCircIn, easeCircOut, easeCircInOut,
  easeBackIn, easeBackOut, easeBackInOut,
  easeElasticIn, easeElasticOut, easeElasticInOut,
  easeBounceIn, easeBounceOut, easeBounceInOut,
  easeSteps
};
