/**
 * 如果是在外层获取 oBoxes 应该用 getElementsByClassName 这个API，这样就是获取动态NodeList,
 * 如果是用 querySelectorAll 获取的是静态的，在调用 showBox 方法时不再改变，
 * 而用getElementsByClassName就可以
 *
 * 或者也可以写进方法里面用 querySelectorAll,每次调用重新获取节点
 */

// const oBoxes = document.querySelectorAll('.box')
const oBoxes = document.getElementsByClassName('box')

export default {
  elFocus(el) {
    ;[...oBoxes].forEach((item) => {
      item.style.zIndex = 0
    })
    el.style.zIndex = 1
  },
}
