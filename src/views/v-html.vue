<template>
  <div v-html="code()"></div>
</template>

<script>
export default {
  data() {
    return {
      html: `<img src="1" onerror="alert('测试')" >`
    }
  },
  methods: {
    code() {
      return this.html
            .replace(/&/g, "&amp;")
            .replace(/>/g, "&gt;")
            .replace(/</g, "&lt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }
  }
}
</script>

<style>

</style>