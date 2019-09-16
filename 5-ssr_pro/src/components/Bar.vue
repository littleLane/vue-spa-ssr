<template>
  <div class="bar">
    <h1 @click="handleClick">Bar Component</h1>
    <div>{{ message }}</div>
  </div>
</template>
<script>
const fetchInitialData = ({ store }) => {
  return store.dispatch('fetchBar')
}

export default {
  name: 'Bar',
  // 用于 dispatch action 获取异步数据
  asyncData: fetchInitialData,

  // 保证应用在纯客户端渲染是没有问题的，因为服务端渲染没有 mounted 生命周期函数
  mounted () {
    fetchInitialData({
      store: this.$store
    })
  },
  computed: {
    message() {
      return this.$store.state.bar
    }
  },
  methods: {
    handleClick() {
      alert('Bar')
    }
  }
}
</script>
<style>
  .bar {
    background-color: antiquewhite;
  }
</style>