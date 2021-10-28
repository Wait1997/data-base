/**
 * 归并排序
 * @param {*} array
 * @returns array
 */
function mergeSort(array) {
  const len = array.length;
  if (len > 1) {
    const middle = Math.floor(len / 2);
    const left = mergeSort(array.slice(0, middle));
    const right = mergeSort(array.slice(middle, len));
    return merge(left, right);
  }
  return array;
}

function merge(left, right) {
  const result = [];
  while (left.length > 0 && right.length > 0) {
    left[0] < right[0] ? result.push(left.shift()) : result.push(right.shift());
  }
  return [...result, ...left, ...right];
}

// 时间复杂度 nlogn
console.log(mergeSort([7, 4, 2, 8, 9, 1, 3, 0]));
