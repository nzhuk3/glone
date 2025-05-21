export default class Ticker {
    instance;
    getTime = Date.now;
    startTime = this.getTime();
    lastUpdate = this.startTime;
    time = 0;
    frame = 0;
    delta;
    listeners = [];
    gap = 1000 / 60;
    nextTime = this.gap;
    tickerActive;
    id;
    i = 0;

    constructor() {
        if (this.instance) {
            return this.instance
        }    

        this.wake();
    }

    tick = () => {
        const elapsed = this.getTime() - this.lastUpdate;
        this.lastUpdate += elapsed;
        this.time = this.lastUpdate - this.startTime;
        this.frame++;

        this.id =  requestAnimationFrame(this.tick);
        if (this.listeners >= 1) {
            console.log('added', this.listeners[1]);
        }

        for (this.i = 0; this.i < this.listeners.length; this.i++) {
            this.listeners[this.i](this.time,this.delta,this.frame);
        }
    }

    add(func, prioritize) {
        this.listeners[prioritize ? "unshift" : "push"](func);
    }

    remove(func) {
        let i = this.listeners.indexOf(func);
        if (i + 1) {
            this.listeners.splice(i, 1);
            if (this.i >= i) this.i--;
        }
    
    }

    wake() {
        if (this.tickerActive) {
        return this.tickerActive 
        } else {
        this.tickerActive = 1;
        this.tick();
        }
    }

    sleep() {
        cancelAnimationFrame(this.id);
        this.tickerActive = false;
        this.id = 0;
    }

    static getInstance() {
        if (!Ticker.instance) {
        Ticker.instance = new Ticker();
        }
        return Ticker.instance;
    }
}

