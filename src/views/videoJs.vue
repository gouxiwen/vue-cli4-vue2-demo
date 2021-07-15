<template>
  <div class="video-page">
    <video
      v-show="showVideo"
      class="video video-js vjs-big-play-centered"
      ref="video"
      poster="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3545731829,3670776579&fm=26&gp=0.jpg"
      controls=""
      :autoplay="false"
      data-setup="{}"
    >
      <source
        ref="source"
        src=""
        type="video/mp4"
      />
    </video>
    <button @click="refreshVideo">刷新视频</button>
  </div>
</template>

<script>
export default {
  name: "videoJs",
  props: {},
  data() {
    return {
      showVideo: true,
    };
  },
  mounted() {},
  methods: {
    refreshVideo() {
      try {
        // this.showVideo = false;
        sessionStorage.setItem("videoSrc", location.href);
        location.href = sessionStorage.getItem("videoSrc");
        // window.location.reload();
        // location.replace(location.href);
        setTimeout(() => {
          this.showVideo = true;
          // this.$nextTick(() => {
          // this.$refs.source.src =
          // console.log(this.$refs.video);
          // this.$refs.video.load();
          //   });
        }, 1000);
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.video-page {
  .video {
    width: 100%;
    height: 300px;
  }
}
</style>
