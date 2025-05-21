import { Animation } from "./core.js";
import Ticker from "./Ticker.js";

// Doubly linked list node wrapper
export class AnimationNode {
  constructor(animation, container) {
    this.animation = animation;
    this.prev = null;
    this.next = null;
    this.container = container;
  }
}

export class AnimationContainer {
    sequenceSteps = [];
    _timeScale = 1;
    _tDur = 0;

    constructor() {
        this.head = null;
        this.tail = null;
        this.targets
        this.startTime = Ticker.getInstance().time;

        Ticker.getInstance().add(this._update, true);
    }

    add(query, props, delay) {
        const elements = Array.from(document.querySelectorAll(query));
        props.parent = this;
        let tDelay = 0;

        elements.forEach((target, i) => {
            
            const animation = new Animation(target, props, 1);
            animation.startTime = (this._tDur + delay) * 1000;
            animation.startOffset = animation.startTime - this.startTime;

            if (props.stagger || props.delay) {
                tDelay = ((props.delay || 0) * 1000 + (props.stagger || 0) * 1000 * i);
                animation.startTime += tDelay;
            }
        
            const node = new AnimationNode(animation, this);
            animation._node = node; // allow animation to remove itself
            this._addNode(node);
            return animation;
        });

        this._tDur += props.duration + tDelay + delay;
        console.log(this._tDur);

        return this;
    }

    animateDefault(query, props, animationType) {
        const elements = document.querySelectorAll(query);
        props.parent = this;

        elements.forEach((target, i) => {
            const animation = new Animation(target, props, animationType);
            animation.startTime = this.startTime + props.delay;
            animation.startOffset = animation.startTime - this.startTime;

            if (props.stagger || props.delay) {
                animation.startTime = this.startTime + (props.delay || 0) * 1000 + (props.stagger || 0) * 1000 * i;
            }

            animation.endTime = animation.startTime + animation.duration;
            
            // Wrap in node and link
            const node = new AnimationNode(animation, this);
            animation._node = node; // allow animation to remove itself
            this._addNode(node);
        });
        return this;
    }


    sequence(query, props, delay = 0) {

        animation.startTime = this._startTime + this._tDur + delay * 1000;
        animation.endTime = animation.startTime + props.duration * 1000;
        
        const animation = new AnimationContainer(query, props, 1, false);
        const node = new AnimationNode(animation, this);
        animation._node = node;

        this._tDur = Math.max(this._tDur, animation.endTime - this._startTime);
        // link nodes
        if (!this.head) this.head = this.tail = node;
        else {
          this.tail.next = node;
          node.prev = this.tail;
          this.tail = node;
        }
        return this;
    }


  // Add node to end of list
    _addNode(node) {
        if (!this.head) {
            this.head = this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
    }

  // Remove a given node from list
    _removeNode(node) {
        if (node.prev) node.prev.next = node.next;
        else this.head = node.next;
        
        if (node.next) node.next.prev = node.prev;
        else this.tail = node.prev;
        
        node.prev = node.next = null;
        node.container = null;
    }


    play(from) {
        console.log('play');
        if (from !== undefined) this.seek(from);
        this._paused = false;
        this.startTime = Ticker.getInstance().time - (this._tTime) / this._timeScale;
        //this._timeScale = Math.abs(this._timeScale) || 1;
        return this;
    }

    pause() {
        this._paused = true;

        return this;
    }

    resume() {
        return this.play();
    }

    reverse(from) {
        if (from !== undefined) this.seek(from);
        this._paused = false;
        this._timeScale = -Math.abs(this._timeScale) || -1;
        return this;
    }

    restart(includeDelay = false) {
        const startPos = includeDelay ? -this._delay || 0 : 0;
        this.seek(startPos);
        return this.play();
    }

    seek(position, suppressEvents = true) {
        console.log("seek");
        this.startTime = Ticker.getInstance().time - (position * 1000) / this._timeScale;
        this._render(position * 1000, suppressEvents, true);
        return this;
    }

    time(value, suppressEvents = true) {
        if (value === undefined) return this._tTime;
        return this.seek(value, suppressEvents);
    }

    progress(value, suppressEvents = true) {
        if (value === undefined) return this._tTime / this._tDur;
        return this.seek(value * this._tDur, suppressEvents);
    }

    timeScale(value) {
        if (value === undefined) return this._timeScale;
        this._timeScale = value;
        return this;
    }

    invalidate() {
        let node = this.head;
        while (node) {
            node.animation.isInitted = false;
            node = node.next;
        }
      return this;
    }

    _render(totalTime, suppressEvents, force) {
        this._tTime = totalTime;
        let node = this.head;
        while (node) {
            const anim = node.animation;
            //console.log(totalTime);
            const localTime = totalTime - anim.startOffset;
            
            console.log(localTime);
            if (localTime < 0) {
                if (force) anim.render(0);
            }
            if (localTime >= 0 && localTime <= anim.duration) {
                anim.render(localTime);
            } else if (localTime > anim.duration) {
                anim.render(anim.duration);
            }
            node = node.next;
        }
        return this;
    }

    _update = (time) => {
        if (this._paused) return;
        const scaled = (time - this.startTime) * this._timeScale;
        this._render(scaled, false, false);
    }
}

// Extend Animation prototype to remove itself
Animation.prototype.removeSelf = function() {
    if (this._node && this._node.container) {
        this._node.container._removeNode(this._node);
    }
}