class MyPromise {
  constructor(callback) {
    this.callback = callback;
  }

  all(iterate) {
    let results = [];
    let promiseCount = 0;
    let promisesLength = iterate.length;
    return new Promise(function (resolve, reject) {
      for (const val of iterate) {
        Promise.resolve(val).then(
          function (res) {
            results[promiseCount++] = res;
            // 当所有函数都正确执行了，resolve输出所有返回结果。
            if (promiseCount === promisesLength) {
              return resolve(results);
            }
          },
          function (err) {
            return reject(err);
          }
        );
      }
    });
  }

  race(iterate) {
    return new Promise((resolve, reject) => {
      for (const item of iterate) {
        item
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      }
    });
  }

  multiAll(urls, maxNum) {
    // 请求总数量
    const len = urls.length;
    // 根据请求数量创建一个数组来保存请求的结果
    const result = new Array(len).fill(false);
    // 当前完成的数量
    let count = 0;

    return new Promise((resolve, reject) => {
      // 请求maxNum个
      while (count < maxNum) {
        next();
      }
      function next() {
        // 处理边界条件
        if (count >= len) {
          // 请求全部完成就将promise置为成功状态, 然后将result作为promise值返回
          !result.includes(false) && resolve(result);
          return;
        }
        const url = urls[count];
        console.log(`开始 ${count}`, new Date().toLocaleString());
        fetch(url)
          .then(res => {
            // 保存请求结果
            result[count++] = res;
            console.log(`完成 ${count}`, new Date().toLocaleString());
            // 请求没有全部完成, 就递归
            if (count < len) {
              next();
            }
          })
          .catch(err => {
            console.log(`结束 ${count}`, new Date().toLocaleString());
            result[count++] = err;
            // 请求没有全部完成, 就递归
            if (count < len) {
              next();
            }
          });
      }
    });
  }

  allSettled(iterate) {}
}

const promise = new MyPromise();
