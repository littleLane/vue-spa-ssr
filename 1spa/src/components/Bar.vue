<template>
  <div class="bar">
    <h1 @click="handleClick">Bar Component</h1>
  </div>
</template>
<script>
export default {
  name: 'Bar',
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