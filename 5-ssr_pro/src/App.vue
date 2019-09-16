<template>
  <div id="app">
    <router-link to="/foo">to Foo</router-link>
    <router-link to="/bar">to Bar</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'App',
    beforeCreate () {
      console.log('beforeCreate')
    },
    created () {
      console.log('created')
    },
    beforeMount () {
      console.log('beforeMount')
    },
    mounted () {
      console.log('mounted')
    },
    beforeUpdate () {
      console.log('beforeUpdate')
    },
    updated () {
      console.log('updated')
    },
    beforeDestroy () {
      console.log('beforeDestroy')
    },
    destroyed () {
      console.log('destroyed')
    }
  }
</script>