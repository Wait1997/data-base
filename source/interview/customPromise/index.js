import CustomPromise from './customPromise';
import './customAsync';

// function test() {
//   return new CustomPromise(resolve => {
//     setTimeout(() => {
//       console.log('xxxxx');
//       resolve(10);
//     }, 1000);
//   });
// }

// const p = new CustomPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(3);
//   }, 100);
// })
//   .then(res => {
//     console.log(res);
//     return test();
//   })
//   .then(res => {
//     console.log(res);
//   });
