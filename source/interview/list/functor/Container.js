import { first } from 'lodash/fp';

class Container {
  static of(value) {
    return new Container(value);
  }

  constructor(value) {
    this._value = value;
  }

  map(fn) {
    return Container.of(fn(this._value));
  }
}

const xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do']);

const ex2 = values => first(values);

console.log(xs.map(ex2));
