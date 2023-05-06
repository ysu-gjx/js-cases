// promise  https://promisesaplus.com/

// 1) 回调写起来不好看（难以维护）  嵌套逻辑不优雅  （链式调用 then)
// 2）错误处理无法统一  我们需要处理公共的错误逻辑
// 3）尽量简化回调   多个异步并发问题  （Promise.all  Promise.finally)

// promise  依旧是基于回调的，可能还是会有嵌套问题

// 1）promise 是一个构造函数，默认需要传入一个executor执行器
// 2）executor 会立刻执行，并且传入 resolve 和 reject 两个参数
// 3）promise 有三个状态 fulfilled 成功态  reject 拒绝态  pending 等待态（默认是等待态）
// 4）每个promise 都有一个 then 方法，可以访问到成功的值和失败的原因
// 5）可以通过resolve 和 reject 来改变状态，同时调用对应的回调，一个promise实例状态变化后，不能再重新发生变化
// 6）或者当executor 发生异常的时候，也会触发promise的失败

// resolve reject pending(default)

const Promise = require('./promise')

const promise = new Promise((resolve, reject) => {
  console.log('executor')
  throw new Error('出错了')
  // resolve('ok')
  // reject('ok')
  // setTimeout(() => {
  //   resolve('2s 后完成')
  // }, 2000)
})

promise.then(
  (data) => {
    console.log('success1: ', data)
  },
  (reason) => {
    console.log('fail1: ', reason)
  }
)
promise.then(
  (data) => {
    console.log('success2: ', data)
  },
  (reason) => {
    console.log('fail2: ', reason)
  }
)

console.log('111')
console.log(promise)
