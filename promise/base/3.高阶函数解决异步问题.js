//
const fs = require('fs') // 文件系统模块  filesystem
const path = require('path') // 路径模块  进行路径操作

// 异步的解决方案 最早就是基于回调函数的 不能使用trycatch 来解决异常
// node 中的异步API 回调的第一个参数  都是err-first

function after(times, callback) {
  // times 会保存在当前的执行上下文中
  let renderObj = {}

  return function (key, value) {
    renderObj[key] = value

    // times 永远取的是外层作用域下的变量
    if (--times === 0) {
      callback(renderObj)
    }
  }
}

let cb = after(2, (data) => {
  // 只有在两次完成后，才能拿到结果，但是无法监控中间过程  （发布订阅）
  console.log(data)
})

fs.readFile(path.resolve(__dirname, 'a.txt'), 'utf-8', (err, data) => {
  if (err) throw err

  cb('msg', data)
})

fs.readFile(path.resolve(__dirname, 'b.txt'), 'utf-8', (err, data) => {
  if (err) throw err

  cb('age', data)
})

// 发布订阅 所有库中都存在发布订阅
// 观察者模式
