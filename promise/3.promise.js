const Promise = require('./promise')

const p = new Promise((resolve, reject) => {
  resolve(1000)
})

let promise2 = p.then(
  (data) => {
    console.log('success', data)
    return promise2
  },
  (err) => {
    console.log('failed', err)
  }
)
promise2.then(null, (err) => {
  console.log(err)
})
