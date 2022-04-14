<template>
   <div>
      <!-- title -->
      <div class="title">
         <h2>{{ result }}</h2>
         <span>共{{ videoCount }}部</span>
      </div>
      <!-- videos -->
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
   async beforeMount() {
      await http
         .get(
            "video/sort-by-" +
               this.$route.query.sort.toLowerCase() +
               "?page=" +
               this.page
         )
         .then(({ data }) => {
            if (data.state == 2000) {
               this.videoCount = data.data.count;
               this.videos = data.data.data;
            }
         })
         .catch((err) => {
            console.log(err);
         });
   },
   methods: {
      changePage(newPage) {
         this.$router.push({ query: { ...this.$route.query, page: newPage } });
         http
            .get(
               "video/sort-by-" +
                  this.$route.query.sort.toLowerCase() +
                  "?page=" +
                  this.page
            )
            .then(({ data }) => {
               if (data.state == 2000) {
                  this.videoCount = data.data.count;
                  this.videos = data.data.data;
               }
            })
            .catch((err) => {
               console.log(err);
            });
         window.scrollTo({ top: 0, behavior: "smooth" });
      },
   },
   computed: {
      page() {
         return parseInt(this.$route.query.page) || 1;
      },
      result() {
         var sort = this.$route.query.sort.toLowerCase();
         if (sort === "newest") return "最新更新";
         if (sort === "upcoming") return "即將開始";
         return "";
      },
   },
   components: {
      "video-img-container": () =>
         import("../components/video-img-container.vue"),
   },
   data: () => ({
      videoCount: 0,
      videos: {},
   }),
};
</script>

<style lang="scss" scoped>
.title {
   text-align: center;
   margin-top: 50px;
   color: white;
}
.page-div {
   text-align: center;
   margin: 30px 0;
}
</style>
