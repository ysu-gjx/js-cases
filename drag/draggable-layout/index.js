import boxesInfo from './box-info.js'

import DraggableBox from './DraggableBox.js'
;(() => {
  const app = document.querySelector('#app')

  const init = () => {
    boxesInfo.forEach((info) => {
      new DraggableBox(app, info)
    })
  }

  init()

  function render() {
    const fragment = document.createDocumentFragment()
    data.forEach((item) => {
      const oItem = document.createElement('div')
      oItem.id = item.id
      oItem.classList = item.classList.join(' ')
      oItem.style.cssText = `
        left: ${item.pos[0]}px;
        top: ${item.pos[1]}px;
        background-color: ${item.bgColor};
        width: ${item.size[0]}px;
        height: ${item.size[1]}px;
      `

      // oItem.style.left = item.pos[0] + 'px'
      // oItem.style.top = item.pos[1] + 'px'
      // oItem.style.backgroundColor = item.bgColor
      // oItem.style.width = item.size[0] + 'px'
      // oItem.style.height = item.size[1] + 'px'

      oItem.innerHTML = `
        <div class="border left"></div>
        <div class="border top"></div>
        <div class="border right"></div>
        <div class="border bottom"></div>
      `

      fragment.appendChild(oItem)
    })

    app.appendChild(fragment)
  }

  function bindEvent() {
    const oBoxes = app.querySelectorAll('.box')
    oBoxes.forEach((item) => {
      item.addEventListener('mousedown', handleMouseDown, false)
    })
  }

  function handleMouseDown(e) {
    const oItem = this
    const { target } = e

    target._x = e.clientX - target.offsetLeft
    target._y = e.clientY - target.offsetTop

    document.addEventListener('mousemove', handleMouseMove, false)
    oItem.addEventListener('mouseup', handleMouseUp, false)

    function handleMouseMove(e) {
      const x = e.clientX - target._x
      const y = e.clientY - target._y

      target.style.left = x + 'px'
      target.style.top = y + 'px'
    }

    function handleMouseUp(e) {
      data.forEach((item) => {
        if (item.id === oItem.id) {
          item.pos[0] = parseFloat(oItem.style.left)
          item.pos[1] = parseFloat(oItem.style.top)
        }
      })

      console.log(data)

      document.removeEventListener('mousemove', handleMouseMove, false)
      oItem.removeEventListener('mouseup', handleMouseUp, false)
    }
  }
})()
