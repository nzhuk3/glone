import { Animation } from "./core.js";
import Ticker from "./Ticker.js";

// Doubly linked list node wrapper
class AnimationNode {
  constructor(animation, container) {
    this.animation = animation;
    this.prev = null;
    this.next = null;
    this.container = container;
  }
}

export class AnimationContainer {
    sequenceSteps = [];
    constructor() {
        this.head = null;
        this.tail = null;
        this.startTime = Ticker.getInstance().time;


    
        Ticker.getInstance().add(this.render, true);
    }

  animateDefault(query, props, animationType) {
    const elements = document.querySelectorAll(query);
    props.parent = this;
    elements.forEach((target, i) => {
      if (props.stagger) {
        props.startTime = this.startTime + props.stagger * 1000 * (i - 1);
      }
      const animation = new Animation(target, props, animationType);
      // Wrap in node and link
      const node = new AnimationNode(animation, this);
      animation._node = node; // allow animation to remove itself
      this._addNode(node);
    });


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

  // Method to remove animation by index
  removeAnimation(index) {
    let current = this.head;
    let i = 0;
    while (current) {
      if (i === index) {
        this._removeNode(current);
        break;
      }
      current = current.next;
      i++;
    }
  }

  sequence(query, props, delay) {
    const elements = Array.from(document.querySelectorAll(query));
    props.parent = this;
    const previousEndTime = this.sequenceSteps.length ? this.sequenceSteps[this.sequenceSteps.length - 1][0].endTime : this.startTime;
    console.log('Конец предыдущей', query, previousEndTime);

    this.sequenceSteps.push(elements.map((target, i) => {
        props.startTime = previousEndTime + delay * 1000;
        if (i === 0) console.log('Начало следующей', query, this.startTime);
        const animation = new Animation(target, props, 1);

        const node = new AnimationNode(animation, this);
        animation._node = node; // allow animation to remove itself
        this._addNode(node);
        return animation;
    }));
  }



  stop() {
    let node = this.head;
    while (node) {
      node.animation.stop();
      node = node.next;
    }
  }

  continue() {
    let node = this.head;
    while (node) {
      node.animation.continue();
      node = node.next;
    }
  }

  seek(time) {
    let node = this.head;
    while (node) {
      node.animation.seek(time);
      node = node.next;
    }
  }

  render = (time, delta, frame) => {
    let node = this.head;
    while (node) {
      const an = node.animation;
      if (time >= an.startTime) {
        an.render(time);
      }
      
      node = node.next;
    }
  }
}

// Extend Animation prototype to remove itself
Animation.prototype.removeSelf = function() {
  if (this._node && this._node.container) {
    this._node.container._removeNode(this._node);
  }
};
