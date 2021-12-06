const arr = [1, 2, 3, 4];

const newList = arr.map((item, index) => {
  if (item % 2 === 0) {
    return item * 2;
  }
  return item;
});

function map(array, callback) {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray[i] = callback(array[i], i);
  }
  return newArray;
}

const customMap = map(arr, (item, index) => (item % 2 === 0 ? item * 2 : item));

console.log(newList);
console.log(customMap);

function memorize(callback) {
  const caches = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (caches.has(key)) {
      return caches.get(key);
    }
    const value = callback(...args);
    caches.set(key, value);
    return value;
  };
}

function circleArea(r) {
  console.log('朱艳');
  return Math.PI * r * r;
}
function add(a, b) {
  console.log('xiaozhuzhu');
  return a + b;
}

const cacheFunc = memorize(circleArea);

const sumsCache = memorize(add);

cacheFunc(3);
cacheFunc(3);
cacheFunc(3);

sumsCache(1, 3);
sumsCache(1, 3);
sumsCache(1, 3);

// 柯里化(按照顺序传参数)
export function curry(callback) {
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

const restSum = curry(sum);
console.log(restSum(1, 2, 3));
console.log(restSum(1)(2, 3));
console.log(restSum(1, 2)(3));
console.log(restSum(1)(2)(3));
