import { map, curry, first } from 'lodash/fp';

class MayBe {
  constructor(value) {
    this._value = value;
  }

  map(fn) {
    return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value));
  }

  isNothing() {
    return this._value === null || this._value === undefined;
  }

  static of(value) {
    return new MayBe(value);
  }
}

// const ex1 = values => map(value => ++value, values);
// const maybe = MayBe.of([5, 6, 1]);

// console.log(maybe.map(ex1));

/*
  练习3:
  实现 ex3 函数
  使用 safeProp 和 fp.first 找到 user 的名字的首字母
*/

// const safeProp = curry(function (x, o) {
//   return MayBe.of(o[x]);
// });

// const user = { id: 2, name: 'Albert' };

// const ex3 = () => safeProp('name', user).map(value => first(value));

// // 2.测试打印
// console.log(ex3()); // Maybe { _value: 'A' }

console.log(ex4('7R')); // Maybe { _value: 7 }
console.log(ex4('7.6B')); // Maybe { _value: 7 }
console.log(ex4('8.2G')); // Maybe { _value: 8 }

console.log(ex4(null)); // Maybe { _value: null }
console.log(ex4(undefined)); // Maybe { _value: undefined }

console.log(ex4('i7.5')); // Maybe { _value: NaN }
console.log(ex4('abc')); // Maybe { _value: NaN }
