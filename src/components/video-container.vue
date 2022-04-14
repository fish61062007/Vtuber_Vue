<template>
   <div class="wrapper">
      <div class="bar">
         <h2 class="mt-0">{{ label }}</h2>
         <router-link
            style="text-decoration: none; color: inherit"
            :to="{ name: 'Videos', query: { sort: title, page: 1 } }"
            >more>></router-link
         >
      </div>
      <div class="videos">
         <v-row>
            <v-col
               v-for="video in videos"
               :key="video.videoId"
               cols="12"
               md="4"
            >
               <video-img-container v-bind="video"></video-img-container>
            </v-col>
         </v-row>
      </div>
   </div>
</template>
<script>
import http from "../assets/js/http-common.js";
export default {
   async beforeMount() {
      await http
         .get("video/" + this.title)
         .then(({ data }) => {
            if (data.state == 2000) {
               this.videos = data.data;
            }
         })
         .catch((err) => {
            console.log(err);
         });
   },
   data: () => ({
      videos: {},
   }),
   components: {
      "video-img-container": () =>
         import("../components/video-img-container.vue"),
   },
   methods: {
      img(videoId) {
         return "https://i.ytimg.com/vi/" + videoId + "/hqdefault.jpg";
      },
   },
   computed: {
      label() {
         if (this.title == "newest") return "最新更新";
         if (this.title == "upcoming") return "即將開始";
         return "";
      },
   },
   props: {
      title: {
         type: String,
         default: "",
      },
   },
};
</script>
<style lang="scss" scoped>
.bar {
   padding: 0.25em 1.5em;
   display: flex;
   flex-flow: row nowrap;
   align-items: center;
   border-top: 2px solid #f06292;
   border-bottom: 2px solid #f06292;
   border-top-left-radius: 20px;
   border-bottom-right-radius: 20px;
   background-color: #1e1e1e;
   color: #f06292;
   margin: 0.5em 0;
   a {
      margin-left: auto;
   }
}
</style>
