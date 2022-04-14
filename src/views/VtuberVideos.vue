<template>
   <div>
      <v-container>
         <v-row dense>
            <v-col
               v-for="video in videos"
               :key="video.videoId"
               cols="12"
               md="3"
            >
               <video-img-container v-bind="video"></video-img-container>
            </v-col>
         </v-row>
      </v-container>
      <!-- pagination -->
      <div class="page-div">
         <v-pagination
            dark
            :value="page"
            :length="Math.ceil(videoCount / 16)"
            :total-visible="7"
            @input="changePage($event)"
         ></v-pagination>
      </div>
   </div>
</template>

<script>
import http from "../assets/js/http-common.js";
export default {
   watch: {
      "$route.params.channel_id": {
         handler() {
            http
               .get(
                  "video/getAll/" +
                     this.$route.params.channel_id +
                     "?page=" +
                     this.page
               )
               .then(({ data }) => {
                  this.videoCount = data.data.count;
                  this.videos = data.data.data;
               })
               .catch((err) => {
                  console.log(err);
               });
         },
         immediate: true,
      },
   },
   data: () => ({
      videoCount: 0,
      videos: {},
   }),
   computed: {
      page() {
         return parseInt(this.$route.query.page) || 1;
      },
   },
   methods: {
      changePage(newPage) {
         this.$router.push({ query: { ...this.$route.query, page: newPage } });
         http
            .get(
               "video/getAll/" +
                  this.$route.params.channel_id +
                  "?page=" +
                  this.page
            )
            .then(({ data }) => {
               this.videoCount = data.data.count;
               this.videos = data.data.data;
            })
            .catch((err) => {
               console.log(err);
            });
         window.scrollTo({ top: 0, behavior: "smooth" });
      },
   },
   components: {
      "video-img-container": () =>
         import("../components/video-img-container.vue"),
   },
};
</script>
<style lang="scss" scoped>
.page-div {
   text-align: center;
   margin: 30px 0;
}
</style>
