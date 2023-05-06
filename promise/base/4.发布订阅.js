// 订阅好一件事 当这件事发生的时候 触发对应的函数
// 订阅 on 发布 emit promise内部也是基于发布订阅的

const fs = require('fs')
const path = require('path')

const events = {
  _obj: {}, //其实可以根据事件做映射
  _subs: [], // 订阅中心，将所有的事，都订阅到数组中
  on(callback) {
    this._subs.push(callback)
  },
  // 事情发生后，来依次触发回调
  emit(key, value) {
    this._obj[key] = value

    // 让订阅的数组中的方法 依次执行
    this._subs.forEach((sub) => sub(this._obj))
  },
}

// 可以订阅多个
events.on(() => {
  //  监控每次触发的逻辑，也可以根据具体的事件处理
  console.log('数据被读取了')
})

events.on((data) => {
  // 监控所有的数据读取完毕
  if (Reflect.ownKeys(data).length === 2) {
    console.log('两个文件都读取完毕了')
  }
})

fs.readFile(path.resolve(__dirname, 'a.txt'), 'utf-8', (err, data) => {
  if (err) throw err

  events.emit('msg', data)
})

fs.readFile(path.resolve(__dirname, 'b.txt'), 'utf-8', (err, data) => {
  if (err) throw err

  events.emit('age', data)
})

// 通过发布订阅来实现解耦合，灵活，但是触发是需要用户自己触发的

// 观察者模式是基于发布订阅模式的， 我们数据变化后可以自动通知触发发布。 （vue 响应式原理）
