export class Subject {
  constructor() {
    this.list = [];
  }

  addObserve(observe) {
    this.list.push(observe);
  }

  removeObserve(observe) {
    if (!observe || this.list.length === 0) {
      return false;
    }
    const length = this.list.length;
    this.list = this.list.filter(ob => ob !== observe);
    return this.list.length === this.list;
  }

  notify() {
    this.list.forEach(observe => observe.update());
  }
}

class Observe {
  constructor(name) {
    this.name = name;
  }

  update() {
    console.log(this.name);
  }
}

const ob1 = new Observe('xiaohuang');
const ob2 = new Observe('xiaozhang');

const sb = new Subject();

sb.addObserve(ob1);
sb.addObserve(ob2);

sb.notify();
