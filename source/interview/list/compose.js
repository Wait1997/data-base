import { curry } from './index';

// 增强函数
function compose(...args) {
  return function (value) {
    // acc为每一次执行函数的前一个结果
    return args.reverse().reduce((acc, cur) => cur(acc), value);
  };
}

function reverse(array) {
  return array.reverse();
}

function first(num, array) {
  return array[0] + num;
}

function upLacalCase(str) {
  return str.toLocaleUpperCase();
}

const _first = curry(first);

const last = compose(upLacalCase, _first(6), reverse);

const newFunc = compose(upLacalCase, compose(_first(6), reverse));

console.log(last(['a', 'b', 'c', 'd']));
console.log(newFunc(['a', 'b', 'c', 'd']));
