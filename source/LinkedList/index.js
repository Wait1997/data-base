import { defaultEqual } from '../common/utils/utils'

/**
 * @description node节点
 */
export class Node {
  constructor(element) {
    this.element = element
    this.next = null
  }
}

class LinkedList {
  constructor(equalsFn = defaultEqual) {
    this.count = 0
    this.head = null
    this.equalsFn = equalsFn
  }

  /**
   * 在链表最后添加一个元素
   * @param {unknown} element
   */
  push(element) {
    const node = new Node(element)
    if (this.head === null) {
      this.head = node
    } else {
      let current = this.head
      while (current.next !== null) {
        current = current.next
      }
      // 为链表最后一项添加元素
      current.next = node
    }
    this.count++
  }

  /**
   * 移除特定位置的元素
   * @param {number} index
   */
  removeAt(index) {
    // 越界检查
    if (index >= 0 && index < this.count) {
      let current = this.head
      // 移除第一项
      if (index === 0) {
        this.head = current.next
      } else {
        const previous = this.getElementAt(index - 1)
        current = previous.next
        previous.next = current.next
      }
      this.count--
      return current.element
    }
    return undefined
  }

  /**
   * 插入一个元素
   * @param {unknown} element
   * @param {number} index
   * @returns boolean
   */
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element)
      if (index === 0) {
        const current = this.head
        node.next = current
        this.head = node
      } else {
        const previous = this.getElementAt(index - 1)
        const current = previous.next
        node.next = current
        previous.next = node
      }
      this.count++
      return true
    }
    return false
  }

  /**
   * 返回元素的位置
   * @param {unknown} element
   * @returns
   */
  indexOf(element) {
    let current = this.head
    for (let i = 0; i < this.count && current !== null; i++) {
      if (this.equalsFn(element, current.element)) {
        return i
      }
      current = current.next
    }
    return -1
  }

  remove(element) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }

  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let node = this.head
      for (let i = 0; i < index && node !== null; i++) {
        node = node.next
      }
      return node
    }
    return null
  }

  isEmpty() {
    return this.size() === 0
  }

  size() {
    return this.count
  }

  getHead() {
    return this.head
  }

  toString() {
    if (this.head === null) {
      return ''
    }

    let element = `${this.head.element}`
    let current = this.head.next
    for (let i = 0; i < this.size() && current !== null; i++) {
      element = `${element},${current.element}`
      current = current.next
    }
    return element
  }
}

const list = new LinkedList()

const addList = [10, 15, 20, 25, 30]

addList.forEach((i) => list.push(i))

console.log(list.removeAt(4))

console.log(list.toString())
