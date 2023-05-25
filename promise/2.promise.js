const fs = require('fs')
const path = require('path')

const Promise = require('./promise')

// fs.readFile(path.resolve(__dirname, 'a.txt'), 'utf-8', (err, data) => {
//   if (err) throw err

//   fs.readFile(path.resolve(__dirname, data), 'utf-8', (err, data) => {
//     if (err) throw err
//     console.log(data)
//   })
// })

const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, filePath), 'utf-8', (err, data) => {
      if (err) return reject(err)

      resolve(data)
    })
  })
}

// 1) 如果promise 中的 then 的回调（成功或者失败）返回一个普通值（不是promise，也不是抛出错误），
// 会将结果传递到下一次 then 的成功回调中
// 2) 如果发生了异常,那么会把这个异常抛出到外层then 的失败的回调中去
// 3) 如果返回的是一个promise,那么需要判断这个promise 的状态.如果promise 是成功 就继续将成功的结果
// 传递到外层的成功,如果是失败就将 promise 传递给外层的失败

// 只有抛出异常,或者返回一个失败的 promise 才会走失败,其他的都是成功

readFile('a.txt')
  .then((data) => {
    // return readFile(data)
    // throw new Error('error')
    return 100
  })
  .then(
    (data) => {
      console.log(data, 1111111)
    },
    (err) => {
      console.log('错误', err)
    }
  )
