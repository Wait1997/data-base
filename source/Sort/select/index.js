/**
 * 选择排序
 * @param {unknown[]} array
 * @returns array
 */
function selectSort(array) {
  for (let i = 0; i < array.length; i++) {
    let mum = i;
    for (let k = i + 1; k < array.length; k++) {
      if (array[mum] > array[k]) {
        mum = k;
      }
    }
    // 如果当前i就是最小值则不需要交换
    if (mum !== i) {
      const temp = array[mum];
      array[mum] = array[i];
      array[i] = temp;
    }
  }
  return array;
}

console.log(selectSort([8, 7, 4, 2, 5, 3, 1, 9]));
