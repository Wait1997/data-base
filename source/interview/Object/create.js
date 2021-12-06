// Object.create()生成过程(不考虑第二个参数和第一个参数为null的情况)
function create(proto) {
  if (typeof proto !== 'object' && typeof proto !== 'function') {
    throw new TypeError('Object prototype may only be an Object: ' + proto);
  } else if (proto === null) {
    throw new Error(
      "This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument."
    );
  }

  function F() {}
  F.prototype = proto;

  return new F();
}

// new生成过程
function _new(...args) {
  if (Object.prototype.toString.call(args[0]) !== '[object Function]') {
    throw 'The first parameter must be a function.';
  }
  const obj = {};
  obj.__proto__ = args[0].prototype;

  const res = args[0].apply(obj, args.slice(1));

  return res instanceof Object ? res : obj;
}

function F() {}
const f = _new(F);

function customInstanceof(left, right) {
  // 获取对象的原型对象
  let proto = Object.getPrototypeOf(left);
  // 获取函数的原型
  const prototype = right.prototype;

  while (true) {
    if (!proto) {
      return false;
    }
    if (proto === prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
}
