const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

const resolvePromise = (promise2, x, resolve, reject) => {
  // 处理x 导致的 promise2 是成功还是失败
  // 如果x 是普通值, 直接调用 promise2 的resolve
  // 如果x 是一个promise 那么久采用 x 的状态.并且将结果继续调用 promise2 的resolve 和 reject 向下传递

  if (promise2 === x) {
    console.log(2)
    reject(new TypeError('Chaining cycle detected for promise #<Promise>]'))
  }

  // if (typeof x )
}

class Promise {
  constructor(executor) {
    this.status = PENDING // 默认是等待态
    this.value = undefined // 成功的值
    this.reason = undefined // 失败的原因
    this.onResolvedCallbacks = [] // 专门存放成功的回调的函数
    this.onRejectedCallbacks = [] // 专门存放失败的回调函数的
    // promise 调用 then 的时候，可能状态依旧是pending, 那么我们需要将函数先存放起来
    // 等待过一会调用resolve 时触发 onResolvedCallbacks 执行
    // 等待调用 reject 时触发 onRejectedCallbacks 执行

    const resolve = (value) => {
      // 只有状态是pending 的时候，才可以修改状态 和 改变成功和失败的原因
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value

        // 发布   成功触发成功的回调
        this.onResolvedCallbacks.forEach((cb) => cb())
      }
    }
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason

        // 发布   失败触发失败的回调
        this.onRejectedCallbacks.forEach((cb) => cb())
      }
    }

    // 调用executor 会自动传入 resolve 和 reject
    try {
      executor(resolve, reject)
    } catch (e) {
      // 如果内部出错直接将err手动的调用reject方法向下传递
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    let promise2 = new Promise((resolve, reject) => {
      // 调用then 的时候， 已经确定了是成功还是失败了
      if (this.status === FULFILLED) {
        // TODO..
        try {
          //宏任务  确保调用resolvePromise 时promise2 已经 new 完
          setTimeout(() => {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          }, 0)
        } catch (e) {
          reject(e)
        }
      }

      if (this.status === REJECTED) {
        try {
          setTimeout(() => {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          }, 0)
        } catch (e) {
          reject(e)
        }
      }

      if (this.status === PENDING) {
        // 订阅 成功回调和失败回调
        this.onResolvedCallbacks.push(() => {
          try {
            setTimeout(() => {
              let x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            }, 0)
          } catch (e) {
            reject(e)
          }
        })
        this.onRejectedCallbacks.push(() => {
          try {
            setTimeout(() => {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            }, 0)
          } catch (e) {
            reject(e)
          }
        })
      }
    })

    return promise2
  }
}

module.exports = Promise
