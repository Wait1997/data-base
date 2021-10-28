import { defaultEqual } from '../../common/utils/utils';

export function bubble(array, compute = defaultEqual) {
  if (Array.isArray(array)) {
    for (let i = 0; i < array.length; i++) {
      for (let k = 0; k < array.length - i - 1; k++) {
        if (array[k] > array[k + 1]) {
          const temp = array[k + 1];
          array[k + 1] = array[k];
          array[k] = temp;
        }
      }
    }
    return array;
  }
  return array;
}

console.log(bubble([4, 5, 2, 1, 7, 9, 3]));
