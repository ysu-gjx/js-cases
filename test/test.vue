<route lang="json5">
{
  layout: 'demo',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '',
  },
}
</route>

<template>
  <view
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
  >
    <view class="text-center text-3xl mt-8">
      鸽友们好，我是
      <text class="text-red-500" @click="clickBall">菲鸽</text>
    </view>
    <ShopCart ref="cart" />
  </view>
</template>

<script lang="ts" setup>
import ShopCart from './components/shop-cart.vue'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const cart = ref()

const clickBall = (e) => {
  const el = e.instance.$el
  console.log(e.instance.$el, cart.value)
  cart.value.drop(el)
}
</script>

<style lang="scss" scoped>
.test-css {
  // mt-4=>1rem=>16px;
  margin-top: 16px;
}
</style>
