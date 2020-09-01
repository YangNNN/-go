<template>
  <div id="app">
    <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'hello'
    }
  }
}
</script>

<style scoped>
@import './style/main.css';
#app {
  color: #000;
}
</style>