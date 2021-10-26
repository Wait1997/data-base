/*
 * @Author: @guofang
 * @Date: 2021-10-15 10:22:57
 * @Last Modified by: @guofang
 * @Last Modified time: 2021-10-18 23:10:34
 */

class Queue {
  constructor() {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }

  /**
   * 向队列中添加元素
   * @param  {...any} elements
   */
  enqueue(...elements) {
    for (const element of elements) {
      this.items[this.count] = element
      this.count++
    }
  }

  /**
   * 向队列中移除元素
   */
  dequeue() {
    if (this.isEmpty()) {
      return underfined
    }
    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return result
  }

  /**
   * 返回队首元素
   * @returns {number|underfined}
   */
  peek() {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.lowestCount]
  }

  /**
   * 判断队列的长度
   * @returns {number}
   */
  size() {
    return this.count - this.lowestCount
  }

  /**
   * 判断队列是否为空
   * @returns {boolean}
   */
  isEmpty() {
    return this.size() === 0
  }

  /**
   * 清空队列的方法
   */
  clear() {
    this.items = {}
    this.count = 0
    this.lowestCount = 0
  }

  /**
   * 转换为字符串
   * @returns {string}
   */
  toString() {
    if (this.isEmpty()) {
      return ''
    }
    return Object.values(this.items).toString()
  }
}

const queue = new Queue()

export default queue
