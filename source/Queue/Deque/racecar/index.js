import deque from '../../Deque'

/**
 * 回文检查器 双端队列
 * @param {string} car
 */
export default function racecar(car) {
  if (!car) {
    return false
  }

  const lowerCar = car.toLocaleLowerCase()
  let isEqual = true

  for (const i of lowerCar) {
    deque.addBack(i)
  }

  while (deque.size() > 1 && isEqual) {
    const first = deque.removeFront()
    const last = deque.removeBack()
    if (first !== last) {
      isEqual = false
    }
  }

  return isEqual
}
