/*
 * @Author: @guofang
 * @Date: 2021-10-15 10:22:57
 * @Last Modified by: @guofang
 * @Last Modified time: 2021-10-15 10:45:20
 */

class Queue {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  /**
   * 向队列中添加元素
   * @param  {...any} elements
   */
  enqueue(...elements) {
    for (const element of elements) {
      this.items[this.count] = element;
      this.count++;
    }
  }

  /**
   * 向队列中移除元素
   */
  dequeue() {}
}
