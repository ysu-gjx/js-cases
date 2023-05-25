import boxController from './boxController.js'

// 面向对象
export default class DraggableBox {
  constructor(container, { id, classList, size, bgColor, pos }) {
    this.container =
      container instanceof HTMLElement
        ? container
        : document.querySelector(container)

    this.id = id
    this.className = classList.join(' ')
    this.size = size
    this.width = size[0]
    this.height = size[1]
    this.bgColor = bgColor
    this.pos = pos
    this.left = pos[0]
    this.top = pos[1]

    // 事件函数需要绑定 this , 或者也可以使用箭头函数
    this._handleMouseDown = null
    this._handleMouseMove = null
    this._handleMouseUp = null
    this._elementScale = null

    this.render()
    this.bindEvent()
  }
  render() {
    this.el = this.createBox()
    this.container.appendChild(this.el)
  }
  bindEvent() {
    this._handleMouseDown = this.handleMouseDown.bind(this)
    this.el.addEventListener('mousedown', this._handleMouseDown, false)
  }
  handleMouseDown(e) {
    boxController.elFocus(this.el)

    const x = e.clientX - this.el.offsetLeft
    const y = e.clientY - this.el.offsetTop
    const _x = e.clientX
    const _y = e.clientY

    const diffX = this.el.offsetWidth - x
    const diffY = this.el.offsetHeight - y

    if (diffX <= 10 && diffY <= 10) {
      this.elementScale({ x: _x, y: _y })
    } else {
      this.elementMove({ x, y })
    }
  }
  elementScale({ x, y }) {
    this._elementScale = this.handleScale.bind(this, { x, y })

    window.addEventListener('mousemove', this._elementScale, false)
  }
  handleScale(...args) {
    // 拖拽改变大小 两种思路
    /**
     * 1. 记录初始的 鼠标坐标，和初始的元素宽高，每次变化都在最开始的宽高上加减鼠标相对于初始
     *    鼠标的位置的偏移量
     * 2. 记录初始的鼠标坐标和初始宽高后，取最新的宽高,在将初始鼠标x,y坐标改变为新的x,y
     */
    const [initialXY, e] = args

    // 第一种思路
    // let diffX = this.width + (e.clientX - initialXY.x)
    // let diffY = this.height + (e.clientY - initialXY.y)
    // if (diffX <= 50) {
    //   diffX = 50
    // }
    // if (diffY <= 50) {
    //   diffY = 50
    // }

    /**
     * 第二种思路   建议用第二种
     */

    const diffX = e.clientX - initialXY.x
    const diffY = e.clientY - initialXY.y
    const newWidth =
      this.el.offsetWidth + diffX <= 50 ? 50 : this.el.offsetWidth + diffX
    const newHeight =
      this.el.offsetHeight + diffY <= 50 ? 50 : this.el.offsetHeight + diffY

    initialXY.x = e.clientX
    initialXY.y = e.clientY

    this.el.style.width = newWidth + 'px'
    this.el.style.height = newHeight + 'px'

    this.size[0] = diffX
    this.size[1] = diffY

    this._handleMouseUp = this.handleMouseUp.bind(this, { w: diffX, h: diffY })

    this.el.addEventListener('mouseup', this._handleMouseUp, false)
    window.addEventListener('mouseup', this._handleMouseUp, false)
  }
  elementMove({ x, y }) {
    this._handleMouseMove = this.handleMouseMove.bind(this, { x, y })
    this._handleMouseUp = this.handleMouseUp.bind(this)
    window.addEventListener('mousemove', this._handleMouseMove, false)
    this.el.addEventListener('mouseup', this._handleMouseUp, false)
    window.addEventListener('mouseup', this._handleMouseUp, false)
  }
  handleMouseMove(...args) {
    const [startXY, e] = args
    let x = e.clientX - startXY.x
    let y = e.clientY - startXY.y

    let posX = 0
    let posY = 0
    // 边界处理
    if (x <= 0) {
      posX = 0
    } else if (x >= document.body.clientWidth - this.el.offsetWidth) {
      posX = document.body.clientWidth - this.el.offsetWidth
    } else {
      posX = x
    }

    if (y <= 0) {
      posY = 0
    } else if (y >= document.body.clientHeight - this.el.offsetHeight) {
      posY = document.body.clientHeight - this.el.offsetHeight
    } else {
      posY = y
    }

    this.el.style.left = posX + 'px'
    this.el.style.top = posY + 'px'

    this.left = posX
    this.top = posY
    this.pos[0] = posX
    this.pos[1] = posY
  }
  handleMouseUp(...args) {
    const [wh, e] = args
    if (wh.w) {
      this.width = wh.w
      this.height = wh.h
    }

    window.removeEventListener('mousemove', this._handleMouseMove, false)
    this.el.removeEventListener('mouseup', this._handleMouseUp, false)
    window.removeEventListener('mouseup', this._handleMouseUp, false)
    window.removeEventListener('mousemove', this._elementScale, false)
  }
  createBox() {
    const oItem = document.createElement('div')
    oItem.id = this.id
    oItem.className = this.className
    oItem.style.cssText = `
        left: ${this.left}px;
        top: ${this.top}px;
        background-color: ${this.bgColor};
        width: ${this.width}px;
        height: ${this.height}px;
      `

    return oItem
  }
}
