<template>
  <div id="app">
    <!-- <Upload msg="Welcome to Your Vue.js App"/> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import Upload from './components/Upload.vue'
// import callPc from './config/CallTlinkpc'
export default {
  name: 'App',
  components: {
    // Upload
  },
  mounted() {
    // console.log(callPc)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
