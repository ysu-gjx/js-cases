const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

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
    // 调用then 的时候， 已经确定了是成功还是失败了
    if (this.status === FULFILLED) {
      // TODO..
      onFulfilled(this.value)
    }

    if (this.status === REJECTED) {
      onRejected(this.reason)
    }

    if (this.status === PENDING) {
      // 订阅 成功回调和失败回调
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value)
      })
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
  }
}

module.exports = Promise
