import Ticker from './Ticker.js';

const capsExp = /([A-Z])/g;
const horizontalExp = /(left|right|width|margin|padding|x)/i;
const complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi
const complexExp = /[\s,\(]\S/;
const numExp = /(?:-?\.?\d|\.)+/gi;
const valueExp = /(-?\d){1,}/;
const unitExp = /[a-z]{2,}/;
const _255 = 255;
const colorLookup = {
    aqua: [0, _255, _255],
    lime: [0, _255, 0],
    silver: [192, 192, 192],
    black: [0, 0, 0],
    maroon: [128, 0, 0],
    teal: [0, 128, 128],
    blue: [0, 0, _255],
    navy: [0, 0, 128],
    white: [_255, _255, _255],
    olive: [128, 128, 0],
    yellow: [_255, _255, 0],
    orange: [_255, 165, 0],
    gray: [128, 128, 128],
    purple: [128, 0, 128],
    green: [0, 128, 0],
    red: [_255, 0, 0],
    pink: [_255, 192, 203],
    cyan: [0, _255, _255],
    transparent: [_255, _255, _255, 0]
}

const colorExp = function () {
    var s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",
        //we'll dynamically build this Regular Expression to conserve file size. After building it, it will be able to find rgb(), rgba(), # (hexadecimal), and named color values like red, blue, purple, etc.,
    p;
  
    for (p in colorLookup) {
      s += "|" + p + "\\b";
    }
  
    return new RegExp(s + ")", "gi");
}()



export class Animation { 
    timeScale = 1;
    pA = null;

    constructor(target, props) {
        this.animatableProps = parseInitialProps(target, props);
        this.ease = props.ease;
        this.target = target;
        this.initStyles = collectAppliedStyles(target, this.animatableProps);
        this.duration = this.duration * 1000 || 0.5 * 1000;
        this.startTime = Ticker.getInstance().time;
        this.endTime = this.startTime + this.duration;
        console.log(this);

        this.initAnimation(this.animatableProps);
        //Ticker.getInstance().add(this.render, true);
    }

    initAnimation(props) {
        let pA;
        for (const p in props) {
            let newPA;
            if (complexExp.test(props[p])) {
                newPA = getComplexPA(this.target, p, this.initStyles[p], props[p]);
            } else if (colorExp.test(props[p])) {
                newPA = getColorPA(this.target, p, this.initStyles[p], props[p]);
            } else if (numExp.test(props[p])) {
                newPA = getPlainPA(this.target, p, this.initStyles[p], props[p]);
            } else {
                newPA = getNonAnimatablePA(this.target, p, this.initStyles[p], props[p]);
            }
            if (this.pA == null) {
                pA = newPA;
                this.pA = pA;
            } else {
                pA.next = newPA;
                pA = pA.next;
            }
        }
    }

    render = (time, delta, frame) => {
        if (time > this.endTime) {
            Timeline.getInstance().remove(this.render);
            this.renderProps(1);
            return;
        }

        const elapsed = Math.abs(this.startTime - time);
        const progress = elapsed / this.duration;
        this.renderProps(progress);
        // this.applyProps();
    }
}

class PropAnimation {
    
    constructor(target, prop, start, end, renderer, filter) {
        this.target = target;
        this.prop = prop;
        this.start = start;
        this.renderer = renderer;
        this.value = renderer(start, end);
    }

    render(progress) {
        renderer(this, progress);
    }
}


function getComplexPA(target, prop, start, end) {
    const pA = new PropAnimation(target, prop, start, end, () => {});
    let _pA = pA;
    if (end.match(colorExp)) {
        end = colorFilter(end);
    }

    let res;
    let index = 0;
    let matchIndex = 0;
    let endNum;
    let chunk;

    const startNums = start.match(complexStringNumExp);
    const endNums = end.match(complexStringNumExp);
    let startNum;

    while (res = complexStringNumExp.exec(end)) {
        endNum = res[0];
        chunk = end.substring(index, res.index);
        
        if (endNum !== startNums[matchIndex++]) {
            startNum = startNums[matchIndex - 1] || 0;
            _pA.subPA = {
                part: chunk,
                start: parseFloat(startNum),
                end: endNum,
                diff: endNum - startNum,
            };
            _pA = _pA.subPA;
        }

        
        index = complexStringNumExp.lastIndex;
    }
    
    console.log(pA);
    return pA;
}

function getColorPA(target, prop, start, end) {
    return getComplexPA(target, prop, start, colorFilter(end));
}

function getPlainPA(target, prop, start, end) {
    return new PropAnimation(target, prop, start, end, () => {});
}

function getNonAnimatablePA(target, prop, start, end) {
    return new PropAnimation(target, prop, start, end, () => {});
}


function colorFilter(str) {
    let res;
    while (res = colorExp.exec(str)) {
        const match = res[0];
        console.log(res);

        if (colorLookup[match]) {
            console.log('swapped');
            str = str.replace(match, `rgb(${colorLookup[match]})`);
        }   

        if (match.includes('hsl')) {
            str = str.replace(match, hslToRgb(match));
        }

        if (match.includes('#')) {
            str = str.replace(match, hexStringToRGB(match));
        }
        
    }

    return str
}

function parseInitialProps(target, props) {
    const res = {};
    const styles = window.getComputedStyle(target);
    for (const p in props) {
        if (styles[p]) {
            if (p == 'x' || p == 'y') {
                res['translate' + p.toUpperCase()] = props[p];
            } else {
                res[p] = props[p];
            }
        }
    }

    return res;
}

function collectAppliedStyles(target, props) {
    const computedStyles = window.getComputedStyle(target);
  
    const res = {};
    let transforms = {};

    if (props.translateX || props.translateY || props.rotate || props.scale || props.scaleX || props.scaleY || props.skewX || props.skewY) {
        transforms = getInitialTransformValues(target);
        transforms = Object.entries(transforms)
        .filter(([key, value]) => props.hasOwnProperty(key))
        .reduce((accumulator, [key, prop]) => {
            accumulator[`${key}`] = prop.toString().match(valueExp)[0];
            return accumulator
        },{}) 
    }

    Object.entries(props).forEach( ([key, value]) => {
        if (capsExp.test(key)) key.replace(capsExp, "-$1").toLowerCase();
        if (computedStyles[key] && !isComplexCSSstring(value)) {
            res[key] = computedStyles[key].replace(/(px)/, '');
        } else if (computedStyles[key]) {
            res[key] = computedStyles[key];
        }
    })
  
  return ({...props, ...res, ...transforms});
}

function isComplexCSSstring(string) {
    return complexExp.test(string)
}

function parseProp(prop) { // поддержка других единиц измерения и конвертация в пиксели
    if (prop.value.toString().match(complexExp)) {
        prop.isComplex = true;
        if (prop.value.includes(' ')) {
            prop.parts = prop.value.split(' ');
        }
        prop.parts = prop.value.split(' ');
    } else if (prop.value.toString().match(unitExp)) {
        prop.quantity = prop.value.match(valueExp)[0];
        prop.unit = prop.value.match(unitExp)[0];
    } else if (prop.value.toString().match(valueExp)) {
        prop.quantity = prop.value;
    } else {
        console.error('Wrong prop format or value', prop);
    }

    if (!prop.unit) prop.unit = '';

    return prop;
}

function getTransformMatrix(scaleX, scaleY, rotationDegrees, translateX, translateY) {
    const radians = rotationDegrees * Math.PI / 180;
    const cos = Math.cos(radians).toFixed(4);
    const sin = Math.sin(radians).toFixed(4);
    const matrixValues = [
        cos * scaleX,   
        sin * scaleY,   
        -sin * scaleX,
        cos * scaleY,   
        translateX,   
        translateY    
    ];
    return `matrix(${matrixValues.join(', ')})`;
}

function getInitialTransformValues(element) {
    const computedStyles = window.getComputedStyle(element);
    const transform = computedStyles.transform;
  
    let transformValues = {
        translateX: 0,
        translateY: 0,
        scaleX: 1,
        scaleY: 1,
        rotate: 0,
        skewX: 0,
        skewY: 0
    };

    if (transform !== 'none') {
        const matrix = new WebKitCSSMatrix(transform);

        transformValues = {
            translateX: matrix.m41,                                     // Смещение по оси X
            translateY: matrix.m42,                                     // Смещение по оси Y
            scaleX: matrix.a,                                           // Масштаб по оси X
            scaleY: matrix.d,                                           // Масштаб по оси Y
            rotate: Math.atan2(matrix.b, matrix.a) * (180 / Math.PI),   // Вращение в градусах
            skewX: Math.atan(matrix.c) * (180 / Math.PI),               // Наклон по оси X
            skewY: Math.atan(matrix.b) * (180 / Math.PI)                // Наклон по оси Y
        };
    }

    return transformValues;
}

function getInlineStylesFromCache(cache) {
    let result = {};
    if (cache.translateX || cache.translateY || cache.rotate || cache.scale || cache.scaleX || cache.scaleY || cache.skewX || cache.skewY) {
        result.transform = getTransformValue(cache);
    }
}


function getTransformValue(cache) { // Нужно переписать на 3d transform или на matrix
    let transformString = '';
    if (cache.translateX || cache.translateY) {
        transformString += `translate(${cache.translateX || '0px'}, ${cache.translateY || '0px'}) `;
    }
    if (cache.scaleX) {
        transformString += `scaleX(${cache.scaleX}) `;
    }
    if (cache.scaleY) {
        transformString += `scaleY(${cache.scaleY}) `;
    }
    if (cache.scale) {
        transformString += `scale(${cache.scale}) `;
    }
    if (cache.rotate) {
        transformString += `rotate(${cache.rotate}) `;
    }
    if (cache.skewX) {
        transformString += `skewX(${cache.skewX}) `;
    }
    if (cache.skewY) {
        transformString += `skewY(${cache.skewY}) `;
    }
    return transformString;
}

function hexStringToRGB(hexString) {
    let arr = hexString.slice(1).match(/.{1,2}/g);
    if (!arr || (arr.length !== 3 && arr.length !== 4)) {
        throw new Error("Invalid HEX format");
    }
    
    const result = {
        r: parseInt(arr[0], 16),
        g: parseInt(arr[1], 16),
        b: parseInt(arr[2], 16),
        a: arr[3] ? (parseInt(arr[3], 16) / 255).toFixed(2) : null
    };
    
    return result.a !== null 
        ? `rgba(${result.r}, ${result.g}, ${result.b}, ${result.a})` 
        : `rgb(${result.r}, ${result.g}, ${result.b})`;
}

function rgbToHexString(r, g, b) {
    for (let i = 0; i < 3; i++) {
        arguments[i] > 255 ? arguments[i] = 255 : arguments[i]
        arguments[i] < 0 ? arguments[i] = 0 : arguments[i]
    }
    const a = [Math.floor(r/16), r%16];
    const f = [Math.floor(g/16), g%16];
    const c = [Math.floor(b/16), b%16];
    let result = [];

    [a,f,c].forEach(element => {
        element[1] = element[1].toString(16).toUpperCase();
        element[0] = element[0].toString(16).toUpperCase();
        result.push(element[0], element[1]);
    });
    
    return result.join('');
}

function hslToRgb(hslString) {
    const hslMatch = hslString.match(/hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*(\d*\.?\d+)\s*)?\)/);
    if (!hslMatch) {
        throw new Error("Invalid HSL/HSLA format");
    }
    
    let [_, h, s, l, a] = hslMatch.map(Number);
    s /= 100;
    l /= 100;
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    
    let r = 0, g = 0, b = 0;
    
    if (h < 60) { r = c; g = x; b = 0; }
    else if (h < 120) { r = x; g = c; b = 0; }
    else if (h < 180) { r = 0; g = c; b = x; }
    else if (h < 240) { r = 0; g = x; b = c; }
    else if (h < 300) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }
    
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    
    if (!isNaN(a)) {
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    return `rgb(${r}, ${g}, ${b})`;
}