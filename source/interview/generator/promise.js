const PENDING = 'pending';
const RESOLVED = 'reslved';
const REJECTED = 'rejected';

class MyPromise {
  constructor(fn) {
    // 保存初始状态
    this.state = PENDING;
    // 保存resolve、reject的值
    this.value = null;
    // 保存resolve的回调函数
    this.resolvedCallbacks = [];
    // 保存reject的回调函数
    this.rejectedCallbacks = [];

    try {
      fn(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  resolve(value) {
    if (value instanceof MyPromise) {
      return value.then(this.resolve, this.reject);
    }
    // 保证代码的执行顺序为本轮事件循环的末尾
    setTimeout(() => {
      if (this.state === PENDING) {
        this.state = RESOLVED;
        this.value = value;
        for (const callback of this.resolvedCallbacks) {
          callback(value);
        }
      }
    }, 0);
  }

  reject(value) {
    setTimeout(() => {
      if (this.state === PENDING) {
        // 修改状态
        this.state = REJECTED;
        // 设置传入的值
        this.value = value;
        // 执行回调函数(发布)
        for (const callback of this.rejectedCallbacks) {
          callback(value);
        }
      }
    }, 0);
  }

  then(onResolved, onRejected) {
    // 首先判断两个参数是否为函数类型，因为这两个参数是可选参数
    onResolved = typeof onResolved === 'function' ? onResolved : value => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : error => {
            throw error;
          };

    // 如果是等待状态，则将函数加入对应列表中
    if (this.state === PENDING) {
      // 订阅
      this.resolvedCallbacks.push(onResolved);
      this.rejectedCallbacks.push(onRejected);
    }
    // 如果状态已经凝固，则直接执行对应状态的函数
    if (this.state === RESOLVED) {
      onResolved(this.value);
    }
    if (this.state === REJECTED) {
      onRejected(this.value);
    }
  }
}

const myPromise = new MyPromise((resolve, reject) => {
  resolve('朱艳');
}).then(res => console.log(res));
