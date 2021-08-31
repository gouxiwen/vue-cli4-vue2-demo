<template>
  <div id="app-compotent">
    <router-link to="/upload">upload</router-link>|
    <router-link to="/calendar">calendar</router-link>|
    <router-link to="/calendar1">calendar1</router-link>|
    <router-link to="/calendar2">calendar2</router-link>|
    <router-link to="/calendar3">calendar3</router-link>|
    <router-link to="/videoJs">videoJs</router-link>|
    <router-link to="/fullCalendarDemo">fullCalendarDemo|</router-link>
    <router-link to="/grid">栅格容器</router-link>
    <router-link to="/viewer">图片预览</router-link>
    <router-link to="/v-html">v-html</router-link>
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
#app-compotent {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
