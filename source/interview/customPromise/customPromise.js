const PENDING = 'pending'; // 等待
const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败

/**
 * 解决 then 方法的链式调用
 * @param {* T | Promise<T> | underfined} x
 * @param {* (value: T) => void} resolve
 * @param {* (reason: any) => void} reject
 */
function resolvePromise(p2, x, resolve, reject) {
  // 循环引用时抛出错误
  if (p2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }
  if (x instanceof CustomPromise) {
    // Promise<T>
    x.then(
      value => resolve(value),
      reason => reject(reason)
    );
  } else {
    // T
    resolve(x);
  }
}

class CustomPromise {
  // promise状态属性
  state = PENDING;
  // resolve之后传递的值
  value;
  // reject失败传递的原因
  reason;
  // 初始化 添加成功的 onFulfilled 函数
  onFulfilledCallbacks = [];
  // 初始化 添加失败的 onRejected 函数
  onRejectedCallbacks = [];

  /**
   * @param {* (resolve: (values)=> void, reject: (reason) => void) => void} executor
   */
  constructor(executor) {
    try {
      // 直接写 this 会导致指向 underfined
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  /**
   * 成功的状态函数 value 可选
   * @param {* T | Promise<T> | underfined} value
   */
  resolve(value) {
    // 只有在pending状态才能改变状态
    if (this.state !== PENDING) {
      return;
    }
    this.state = FULFILLED;
    this.value = value;
    // 发布订阅的函数
    for (const fulfilledCallback of this.onFulfilledCallbacks) {
      fulfilledCallback();
    }
  }

  reject(reason) {
    if (this.state !== PENDING) {
      return;
    }
    this.state = REJECTED;
    // 保存失败状态
    this.reason = reason;
    for (const rejectedCallback of this.onRejectedCallbacks) {
      rejectedCallback();
    }
  }

  then(onFulfilled, onRejected) {
    const p2 = new CustomPromise((resolve, reject) => {
      // 如果不是函数则 默认传递resolve的值
      onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
      // catch直接抛出原因
      onRejected =
        typeof onRejected === 'function'
          ? onRejected
          : reason => {
              throw reason;
            };

      if (this.state === FULFILLED) {
        // 定时器解决获取 p2
        setTimeout(() => {
          try {
            // then函数中回调函数的返回值
            const x = onFulfilled(this.value);
            // x 的值可能返回的是 promise<T> | T 因此需要处理这两种情况
            resolvePromise(p2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      } else if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(p2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      } else {
        /**
         * 处理异步任务的时候 会先进入then方法 需要等待异步任务处理完毕 才能拿到当前的状态
         * 因此先将状态函数 订阅到 对应的数组中 状态改变后在发布出去
         */
        this.onFulfilledCallbacks.push(() => {
          // 回调函数形式为了好使用try catch捕获错误和setTimeout
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(p2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
            const x = onFulfilled(this.value);
            resolvePromise(p2, x, resolve, reject);
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(p2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }
    });
    return p2;
  }

  /**
   * 捕获异常的方法
   */
  catch(onRejected) {
    this.then(undefined, onRejected);
  }

  /**
   * 静态函数 Promise.resolve()
   * @param {* T | Promise<T> | underfined} value
   * @returns promise(fulfilled)
   */
  static resolve(value) {
    // 如果是promise直接返回promise 如果不是promise包装为promise
    return value instanceof CustomPromise ? value : new CustomPromise(resolve => resolve(value));
  }

  static all() {}

  static allSettled() {}

  static race(array) {
    return new CustomPromise((resolve, reject) => {
      for (const item of array) {
        if (item instanceof CustomPromise) {
          item.then(data => resolve(data)).catch(error => reject(error));
        } else {
          resolve(item);
        }
      }
    });
  }

  static finally() {}
}

export default CustomPromise;
