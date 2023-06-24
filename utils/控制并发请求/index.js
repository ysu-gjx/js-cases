const req = (id, time) => {
  return () => {
    return new Promise((resolve) => {
      console.log(`请求id:${id},请求时间:${time}`)
      setTimeout(() => {
        console.log(`响应id:${id},响应时间:${time}`)
        resolve(id)
      }, time)
    })
  }
}
const r1 = req(1, 2000)
const r2 = req(2, 1500)
const r3 = req(3, 1000)
const r4 = req(4, 3000)
const r5 = req(5, 2000)
const reqList = [r1, r2, r3, r4, r5]

const reqLimit = (reqList, limit = 1, queue = [], cb) => {
  for (const item of reqList) {
    queue.push(item)
    if (queue.length === limit) {
      break
    }
  }
  const waitingPool = reqList.filter((item, index) => index >= limit)

  const runReq = (run) => {
    run().finally(() => {
      queue.shift()
      if (waitingPool.length) {
        const e = waitingPool.shift()
        queue.push(e)
        runReq(e)
      }
      if (queue.length === 0) {
        cb()
      }
    })
  }
  for (let i = 0; i < limit; i++) {
    runReq(queue[i])
  }
}

reqLimit(reqList, 3, [], () => {
  console.log('执行完毕')
})
// const res = []
// reqList.forEach((t) => {
//   res.push(t())
// })
// const r = Promise.all(res).then((res) => {
//   console.log(res)
// })
// console.log(r)
