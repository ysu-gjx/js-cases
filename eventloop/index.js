oBtn.onclick = function () {
  oText.innerHTML = '文本变了'

  delay(3000)
}

const delay = (duration) => {
  const start = Date.now()

  while (Date.now() - start < duration) {}
}

function a() {
  console.log(1)
  Promise.resolve().then(() => {
    console.log(2)
  })
}

setTimeout(() => {
  console.log(3)
  Promise.resolve().then(a)
}, 0)

Promise.resolve().then(() => {
  console.log(4)
})
console.log(5)

// 5 4 3 1 2
