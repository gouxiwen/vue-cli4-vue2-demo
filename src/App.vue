<template>
  <div id="app">
    <router-link to="/upload">upload</router-link>|
    <router-link to="/calendar">calendar</router-link>|
    <router-link to="/calendar1">calendar1</router-link>
    <router-link to="/calendar2">calendar2</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
// import Upload from './components/Upload.vue'
// import callPc from './config/CallTlinkpc'
export default {
  name: "App",
  components: {
    // Upload
  },
  mounted() {
    // console.log(callPc)
  },
};
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
