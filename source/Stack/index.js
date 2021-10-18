/**
 * @description 栈结构
 */
class Stack {
  /**
   * 初始化栈使用数组|对象存储
   * @param {*} list
   */
  constructor(list) {
    if (list && typeof list === 'object') {
      this.items = list
      if (Object.prototype.toString.call(list) === '[object Object]') {
        this.count = Object.keys(list).length
      }
    } else {
      this.items = {}
      this.count = 0
    }
  }

  /**
   * 添加元素
   * @param {*} element
   */
  push(...elements) {
    if (Array.isArray(this.items)) {
      this.items.push(...elements)
    } else {
      for (const element of elements) {
        this.items[this.count] = element
        this.count++
      }
    }
  }

  /**
   * 移除元素
   */
  pop() {
    if (!this.isEmpty()) {
      if (Array.isArray(this.items)) {
        this.items.pop()
      } else {
        this.count--
        delete this.items[this.count]
      }
    }
  }

  /**
   * 返回栈顶元素
   * @returns
   */
  peek() {
    if (this.isEmpty()) {
      return undefined
    }

    if (Array.isArray(this.items)) {
      return this.items[this.items.length - 1]
    }

    return this.items[count - 1]
  }

  isEmpty() {
    if (Array.isArray(this.items)) {
      return this.items.length === 0
    }
    return this.count === 0
  }

  clear() {
    if (Array.isArray(this.items)) {
      this.items = []
    } else {
      this.items = {}
      this.count = 0
    }
  }

  size() {
    if (Array.isArray(this.items)) {
      return this.items.length
    }
    return this.count
  }

  /**
   * 创建字符串方法
   * @returns 字符串
   */
  toString() {
    if (this.isEmpty()) {
      return ''
    }
    if (Array.isArray(this.items)) {
      return this.items.toString()
    }
    return Object.values(this.items).toString()
  }
}

const stack = new Stack()

export default stack
