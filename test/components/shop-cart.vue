<template>
  <view class="fixed bottom-15px right-0">
    <wd-button type="success" @click="handleClick">基础用法</wd-button>

    <div class="ball-container">
      <div v-for="(ball, index) in balls" :key="index">
        <Transition @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </Transition>
      </div>
    </div>
  </view>
</template>

<script lang="ts" setup>
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const BALL_LEN = 10
const innerClsHook = 'inner-hook'

const handleClick = () => {
  balls.value[0].show = !balls.value[0].show
}
function createBalls() {
  let balls = []
  for (let i = 0; i < BALL_LEN; i++) {
    balls.push({ show: false })
  }
  return balls
}

const balls = ref(createBalls())
const dropBalls = []

const beforeDrop = (el) => {
  console.log(123)
  const ball = dropBalls[dropBalls.length - 1]
  const rect = ball.el.getBoundingClientRect()
  const x = rect.left - 32
  const y = -(window.innerHeight - rect.top - 22)

  el.style.display = ''
  el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`
  console.log(ball.el, x, y, JSON.stringify(el.style.transform))
  const inner = el.getElementsByClassName(innerClsHook)[0]
  inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`
}
const dropping = (el, done) => {
  const _reflow = document.body.offsetHeight
  el.style.transform = el.style.webkitTransform = `translate3d(0,0,0)`
  const inner = el.getElementsByClassName(innerClsHook)[0]
  inner.style.transform = inner.style.webkitTransform = `translate3d(0,0,0)`
  el.addEventListener('transitionend', done)
}
const afterDrop = (el) => {
  const ball = dropBalls.shift()
  if (ball) {
    ball.show = false
    el.style.display = 'none'
  }
}
const drop = (el) => {
  for (let i = 0; i < balls.value.length; i++) {
    const ball = balls.value[i]
    console.log(ball, 1111)
    if (!ball.show) {
      ball.show = true
      ball.el = el
      dropBalls.push(ball)
      return
    }
  }
}

defineExpose({
  drop,
})
</script>

<style lang="scss" scoped>
.ball-container {
  .ball {
    position: fixed;
    bottom: 22px;
    left: 32px;
    z-index: 200;
    transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);

    .inner {
      width: 16px;
      height: 16px;
      background: rgb(53, 53, 245);
      border-radius: 50%;
      transition: all 0.4s linear;
    }
  }
}
</style>
