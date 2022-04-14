<template>
   <div>
      <h3 class="title">推薦影片</h3>
      <div v-for="video in sideVideos" :key="video.videoId">
         <side-video-img-container v-bind="video"></side-video-img-container>
      </div>
   </div>
</template>

<script>
import http from "../assets/js/http-common.js";
export default {
   watch: {
      "$route.params.video_id": {
         handler() {
            http
               .get("video/relative/" + this.$route.params.video_id)
               .then(({ data }) => {
                  this.sideVideos = data.data;
               })
               .catch((err) => {
                  console.log(err);
               });
         },
         immediate: true,
      },
   },
   components: {
      "side-video-img-container": () =>
         import("../components/side-video-img-container.vue"),
   },
   data: () => ({
      sideVideos: {},
   }),
};
</script>

<style lang="scss" scoped>
.title {
   text-align: center;
   color: #00b0ff;
   margin-bottom: 0.5em;
   padding: 0.1em 0;
   border-top: 2px dashed #00b0ff;
   border-top-left-radius: 200px;
   border-bottom: 2px dashed #00b0ff;
   border-bottom-right-radius: 200px;
   background-color: #1e1e1e;
}
</style>
