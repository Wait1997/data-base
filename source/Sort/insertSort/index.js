/**
 * 插入排序
 * @param {*} array
 * @returns array
 */
function insertSort(array) {
  for (let i = 1; i < array.length; i++) {
    let k = i - 1;
    const temp = array[i];
    while (k >= 0 && array[k] > temp) {
      array[k + 1] = array[k];
      k--;
    }
    array[k + 1] = temp;
  }
  return array;
}

console.log(insertSort([7, 4, 2, 8, 5, 3, 1]));
