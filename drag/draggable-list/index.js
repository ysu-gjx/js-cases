const listData = [
  '11111111111111111111',
  '22222222222222222222',
  '33333333333333333333',
  '44444444444444444444',
]

;(() => {
  const oWrapper = document.querySelector('.draggable-list-wrapper')

  const init = () => {
    render()
    bindEvent()
  }

  init()

  function render() {
    const oList = createList()

    oWrapper.appendChild(oList)
  }

  //绑定事件
  function bindEvent() {
    const oDraggableList = oWrapper.querySelector('.draggable-list')
    const oDraggableItems = oDraggableList.querySelectorAll('.draggable-item')

    // 在可拖拽元素上的事件
    oDraggableItems.forEach((item) => {
      item.addEventListener('dragstart', handleDragStart, false)
      item.addEventListener('dragend', handleDragEnd, false)
    })

    // 在放置拖拽元素区域的事件
    oDraggableList.addEventListener('dragover', handleDragOver, false)
  }

  // 创建列表内容
  function createList() {
    const oDraggableList = document.createElement('ul')
    oDraggableList.className = 'draggable-list'

    listData.forEach((item) => {
      const oDraggableItem = document.createElement('li')
      oDraggableItem.className = 'draggable-item'
      oDraggableItem.draggable = true
      oDraggableItem.innerHTML = `<p>${item}</p>`

      oDraggableList.appendChild(oDraggableItem)
    })

    return oDraggableList
  }

  function handleDragStart(e) {
    const oDraggableItem = this
    const oDraggableList = oWrapper.querySelector('.draggable-list')

    // 延迟加类名，
    setTimeout(() => {
      oDraggableItem.classList.add('dragging')

      // const oSibItems = oDraggableList.querySelectorAll(
      //   '.draggable-item:not(.dragging)'
      // )
      // oSibItems.forEach((sib) => {
      //   sib.addEventListener('dragover', dropHandle, false)
      // })
    }, 0)
  }
  function dropHandle(e) {
    const oDraggableList = oWrapper.querySelector('.draggable-list')
    const oDraggableItem = oDraggableList.querySelector('.dragging')
    const sib = this
    e.preventDefault()
    const y = e.clientY
    console.log(y > sib.offsetTop + sib.offsetHeight / 2)
    if (y > sib.offsetTop + sib.offsetHeight / 2) {
      // oDraggableList.removeChild(oDraggableItem)
      if (oDraggableItem.nextSibling === sib) {
        oDraggableList.insertBefore(oDraggableItem, sib.nextSibling)
      } else {
        oDraggableList.insertBefore(oDraggableItem, sib)
      }
    }
  }
  function handleDragEnd(e) {
    const draggableItem = this
    draggableItem.classList.remove('dragging')
  }
  function handleDragOver(e) {
    // 允许拖放
    e.preventDefault()

    const oDraggableList = this
    // dragging item
    const oDraggingItem = oDraggableList.querySelector('.dragging')
    // 获取拖拽元素的所有相邻元素
    const oSibItems = oDraggableList.querySelectorAll(
      '.draggable-item:not(.dragging)'
    )

    // 获取拖拽元素的相邻的元素， 需要仔细体会这里的写法，
    /**
     * 并不是简单直接获取了被拖拽元素的上一个或者下一个相邻元素
     * 通过这个e.clientY <= item.offsetTop + item.offsetHeight / 2 条件获取的
     * 其实是 2个元素的半区
     * 假如  A,B,C,D四个元素列表，
     * 我们拖拽B元素， 那么，在 ul 里拖拽时，相邻元素的判定是
     * 1. 在[A的下半区和C的上半区] oSibItem 为 C
     * 这样的话，当B 向上越过 A中心线到 A上半区时 oSibItem 就变为了 A
     * 就可以实现 将 oDraggingItem 插入到 oSibItem之前 不需要判断时向上拖拽还是向下拖拽
     * 也就是说 同一个元素上半区和下半区 所得拖拽元素的邻居不一样
     */

    const oSibItem = Array.from(oSibItems).find(
      (item) => e.clientY <= item.offsetTop + item.offsetHeight / 2
    )

    // 交换元素
    oDraggableList.insertBefore(oDraggingItem, oSibItem)

    // 不以半区区分的话，需要分向下拖拽和向上拖拽
    /**
     * 
    const { target } = e
    const oSibItem = getParentLi(target)
    if (!oSibItem) return

    if (oSibItem === oDraggingItem.nextSibling) {
      oDraggableList.insertBefore(oDraggingItem, oSibItem.nextSibling)
    } else {
      oDraggableList.insertBefore(oDraggingItem, oSibItem)
    }
  */
  }

  function getParentLi(el) {
    let oSibItem
    if (el.tagName === 'LI') {
      oSibItem = el
    } else if (el.tagName === 'P') {
      oSibItem = el.parentNode
    }

    return oSibItem
  }
})()
