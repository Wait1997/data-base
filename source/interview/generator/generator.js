const readTime = name => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(name);
      } catch (err) {
        reject(err);
      }
    }, 1000);
  });
};

function* gen() {
  const f1 = yield readTime('zhuyan');
  const f2 = yield readTime('go by');
  console.log(f1.toString());
  console.log(f2.toString());
}

const asyncFunc = gen();

// console.log(
//   asyncFunc.next().value.then(data => {
//     console.log(data);
//   })
// );
asyncFunc.next().value.then(res => console.log(res));
console.log(asyncFunc.next('hendeyibi').value.then(res => console.log(res)));
console.log(asyncFunc.next('niubia'));

function getNum(num) {
  return num + 1;
}

function* asncFunc() {
  const result = yield getNum();
  console.log(result);
}

const asyncs = asncFunc();
asyncs.next();
console.log('小猪猪');
asyncs.next('小猪佩奇');
