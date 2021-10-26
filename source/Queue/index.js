import hotPotato from './Circleque'
import racecar from './Deque/racecar'

const names = ['john', 'jack', 'camila', 'ingrid', 'carl']
const result = hotPotato(names, 7)

result.eliminated.forEach((name) => {
  console.log(`${name}被淘汰`)
})

console.log(`胜利者：${result.winner}`)

console.log(racecar('aBcdDcba'))
