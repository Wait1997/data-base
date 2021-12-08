// function* generatorFunc(value) {
//   const id = yield value;
//   console.log(`id:${id}`);
//   const info = yield id;
//   console.log(`info:${info}`);
//   return info;
// }

// const generators = generatorFunc(120110);

// const step1 = generators.next();
// console.log(step1);

// const step2 = generators.next('123456');
// console.log(step2);

// const step3 = generators.next('success');
// console.log(step3);

function asyncOutput(value, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(value);
      } catch (error) {
        reject(error);
      }
    }, delay);
  });
}

asyncOutput('hello', 10)
  .then(data => {
    return asyncOutput(data + 'lagou', 10);
  })
  .then(data => {
    return asyncOutput(data + 'I ♥ U', 10);
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
