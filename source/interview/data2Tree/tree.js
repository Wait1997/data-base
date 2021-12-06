const arr = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 },
  { id: 6, name: '部门6', pid: 9 }
];

/**
 * 数据结构转换成树结构
 * @param {Array} arr
 */
function data2Tree(arr) {
  const result = [];
  const pid = 0;
  getChildren(arr, result, pid);
  return result;
}

function getChildren(arr, result, pid) {
  for (const item of arr) {
    if (item.pid === pid) {
      const newItem = { ...item, children: [] };
      result.push(newItem);
      getChildren(arr, newItem.children, item.id);
    }
  }
}

function array2Tree(arr) {
  const result = [];
  const map = {};

  for (const item of arr) {
    map[item.id] = { ...item, children: [] };
  }

  for (const item of arr) {
    const id = item.id;
    const pid = item.pid;
    const tree = map[id];
    if (pid === 0) {
      result.push(tree);
    } else {
      if (!map[pid]) {
        map[pid] = {
          children: []
        };
      }
      map[pid].children.push(tree);
    }
  }
  return result;
}

// console.log(data2Tree(arr));
console.log(array2Tree(arr));
