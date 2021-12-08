// import { curry } from './index';
import { last, first, prop, curry, flowRight, reduce, map, add, replace, lowerCase } from 'lodash/fp';

const cars = [
  {
    name: 'Ferrari FF',
    horsepower: 660,
    dollar_value: 700000,
    in_stock: true
  },
  {
    name: 'Spyker C12 Zagato',
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false
  },
  {
    name: 'Jaguar XKR-S',
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false
  },
  {
    name: 'Audi R8',
    horsepower: 625,
    dollar_value: 114200,
    in_stock: false
  },
  {
    name: 'Aston Martin One-7',
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true
  },
  {
    name: 'Pagani Huayara',
    horsepower: 700,
    dollar_value: 1300000,
    in_stock: true
  }
];

/**
 * 增强函数
 * @param  {...any: Array<(value: any)=> void>} args 需要增强的函数
 * @returns function
 */
export function _compose(...args) {
  return function (value) {
    console.log(value);
    // acc为每一次执行函数的前一个结果
    return args.reverse().reduce((acc, cur) => cur(acc), value);
  };
}

/**
 * 柯里化(按照顺序传参数)
 * @param {*} callback 需要被柯里化的函数
 * @returns function
 */
export function _curry(callback) {
  return function restCallback(...args) {
    if (args.length < callback.length) {
      return (...rest) => restCallback(...[...args, ...rest]);
    }
    return callback(...args);
  };
}

function sum(a, b, c) {
  return a + b + c;
}

/*
  练习1:  
    let last_car = fp.last(cars)   获取最后一条数据
    fp.prop('in_stock', last_car)  获取最后一条数据的 in_stock 属性值

  实现 isLastInStock 函数, 要求使用 fp.flowRight() 
  把 fp.last(), fp.prop() 组合而成
*/

{
  // 1.实现 isLastInStock 函数
  const _props = curry(prop);
  const isLastInStock = flowRight(_props('in_stock'), last);
  // const _prop = _curry(prop);
  // const isLastInStock = _compose(_prop('in_stock'), last);

  // 2.打印测试
  console.log(isLastInStock(cars)); // 最终返回 true
}

{
  const _propsName = _curry(prop);
  const firstName = _compose(_propsName('name'), first);

  console.log(firstName(cars));

  const _average = function (xs) {
    return reduce(add, 0, xs) / xs.length;
  };

  const averageDollarValue = function (cars) {
    let dollar_values = map(function (car) {
      return car.dollar_value;
    }, cars);
    return _average(dollar_values);
  };

  const _map = _curry(map);
  const _averageDollarValue = _compose(
    _average,
    _map(car => car.dollar_value)
  );
  console.log(_averageDollarValue(cars));
}

{
  const _log = value => {
    console.log(value);
    return value;
  };
  const _underscore = replace(/\W+/g, '_');
  const _mapName = _curry(map);
  const sanitizeNames = flowRight(_mapName(flowRight(_underscore, lowerCase, _log, car => car.name)));

  console.log(sanitizeNames(cars));
}

/* ------------------------------------------------------ */
// function reverse(array) {
//   return array.reverse();
// }

// function first(num, array) {
//   return array[0] + num;
// }

// function upLacalCase(str) {
//   return str.toLocaleUpperCase();
// }

// const _first = _curry(first);

// const lasts = _compose(upLacalCase, _first(6), reverse);

// const newFunc = _compose(upLacalCase, _compose(_first(6), reverse));

// console.log(lasts(['a', 'b', 'c', 'd']));
// console.log(newFunc(['a', 'b', 'c', 'd']));
