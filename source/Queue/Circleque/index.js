import queue from '../SingleQueue/index'

/**
 * 击鼓传花的游戏 循环队列
 * @param {string[]} elementsList
 * @param {number} num
 * @returns
 */
export default function hotPotato(elementsList, num) {
  const eliminatedList = []

  for (const element of elementsList) {
    queue.enqueue(element)
  }

  while (queue.size() > 1) {
    // 循环队列
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue())
    }

    eliminatedList.push(queue.dequeue())
  }

  return {
    eliminated: eliminatedList,
    winner: queue.dequeue()
  }
}
