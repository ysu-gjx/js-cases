// 获取列表元素
const list = document.getElementById('list')

// 获取列表数据
const data = [
  { id: 1, name: '苹果' },
  { id: 2, name: '香蕉' },
  { id: 3, name: '橘子' },
]

// 渲染列表
function renderList() {
  // 使用模板字符串和 map 方法生成列表项的 HTML
  const html = data
    .map(
      (item) => `
    <li draggable="true">
      ${item.name}
    </li>
  `
    )
    .join('')
  list.innerHTML = html
}

renderList()

// 定义变量
let dragIndex // 被拖动元素的索引
let dropIndex // 目标元素的索引
let dragItem // 被拖动元素
let dropItem // 目标元素

// 监听 dragstart 事件
list.addEventListener('dragstart', function (e) {
  // 获取被拖动元素
  dragItem = e.target
  // 获取被拖动元素的索引
  dragIndex = Array.from(list.children).indexOf(dragItem)
})

// 监听 dragover 事件
list.addEventListener('dragover', function (e) {
  // 阻止默认行为，以允许放置操作
  e.preventDefault()
})

// 监听 dragenter 事件
list.addEventListener('dragenter', function (e) {
  // 获取目标元素
  dropItem = e.target
  // 获取目标元素的索引
  dropIndex = Array.from(list.children).indexOf(dropItem)
})

// 监听 drop 事件
list.addEventListener('drop', function (e) {
  // 阻止默认行为，以允许放置操作
  e.preventDefault()
  // 如果目标元素是列表项，且不是被拖动元素本身
  if (dropItem.tagName === 'LI' && dropItem !== dragItem) {
    // 如果目标元素在被拖动元素之前，就把它插入到被拖动元素之前
    if (dropIndex < dragIndex) {
      list.insertBefore(dragItem, dropItem)
    } else {
      // 否则，就把它插入到被拖动元素之后
      list.insertBefore(dragItem, dropItem.nextSibling)
    }
    // 使用解构赋值交换列表数据的位置
    ;[data[dragIndex], data[dropIndex]] = [data[dropIndex], data[dragIndex]]
    console.log(data)
  }
})
