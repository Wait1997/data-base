// 调度中心
class Dispatcher {
  constructor() {
    this.dispatcher = {};
  }

  // 订阅者添加订阅
  subscribe(type, listender) {
    if (!type) {
      return;
    }
    if (!this.dispatcher[type]) {
      this.dispatcher[type] = [];
    }
    this.dispatcher[type].push(listender);
  }

  // 只订阅一次
  once(type, listender) {
    console.log(this);
    const one = (...args) => {
      listender(...args);
      this.unsubscribe(type);
    };

    this.subscribe(type, one);
  }

  // 取消订阅
  unsubscribe(type, listender) {
    const listenders = this.dispatcher[type];
    if (!listenders || listenders.length === 0) {
      return;
    }
    if (!listender) {
      this.dispatcher[type] = [];
    }
    this.dispatcher[type] = listenders.filter(lis => lis !== listender);
  }

  // 发布订阅
  publish(type, ...args) {
    const listenders = this.dispatcher[type];
    if (!listenders) {
      return;
    }
    listenders.forEach(lis => lis(...args));
  }
}

const dispatcher = new Dispatcher();

dispatcher.subscribe('on', (s, b) => {
  console.log(s, b);
});

dispatcher.subscribe('on', (s, b) => {
  console.log(`艹，大傻逼${b}，dou you konw ${s}`);
});

dispatcher.once('once', sb => {
  console.log(sb);
});

dispatcher.publish('on', '夏雪', '钗头凤');
dispatcher.publish('once', '你是傻逼吗');

console.log(dispatcher.__proto__ === Dispatcher.prototype);
console.log(Dispatcher.prototype.__proto__ === Object.prototype);
console.log(Dispatcher.prototype.__proto__.__proto__ === null);
