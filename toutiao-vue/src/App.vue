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
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetch('/list?tab=all')
        .then(res => {
          return res.json()
        })
        .then(({ data }) => {
          console.log(data)
        })
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