/**
 *  *数组扁平化
 * @param {Array} arr
 * @param {Boolean} deep
 * @returns 处理之后的结果
 */
export function flatArr(arr, depth = Infinity) {
  return arr.flat(depth)
}

/**
 * *数组转为树形结构，
 * @param {Array} arr
 * @param {*} id
 * @param {*} pid
 */
// *非递归实现
export function arrayToTree(list, id, pid) {
  const ret = []
  list.forEach((item) => {
    if (item.pid === '') {
      ret.push(item)
    } else {
      const parent = list.find((x) => x.id === item.pid)
      if (parent.children) {
        parent.children.push(item)
      } else {
        parent.children = [item]
      }
    }
  })

  return ret
}

// *递归实现
function arrayToTree2(list, id = '') {
  const ret = []
  list.forEach((item) => {
    if (item.pid === id) {
      const children = arrayToTree(list, item.id)
      if (children.length) {
        item.children = children
      }

      ret.push(item)
    }
  })

  return ret
}

const list = [
  { id: 'a', pid: '', name: '总裁办' },
  { id: 'b', pid: '', name: '行政部' },
  { id: 'c', pid: '', name: '财务部' },
  { id: 'd', pid: 'c', name: '财务核算部' },
  { id: 'e', pid: 'c', name: '税务管理部' },
  { id: 'f', pid: 'e', name: '税务管理 A 部' },
  { id: 'g', pid: 'e', name: '税务管理 B 部' },
]

const tree = arrayToTree(list)
console.log(tree)
