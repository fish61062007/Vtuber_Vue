<template>
   <v-container>
      <!-- title -->
      <div v-if="isLoading" class="title">
         <h2>搜尋中......</h2>
      </div>
      <div v-else class="title">
         <span>搜尋結果</span>
         <h2>{{ $route.params.search_text }}</h2>
         <span>共{{ videoCount }}部</span>
      </div>
      <!-- videos -->
      <div class="videos">
         <v-row>
            <v-col
               v-for="video in videos"
               :key="video.videoId"
               cols="12"
               md="3"
            >
               <video-img-container v-bind="video"></video-img-container>
            </v-col>
         </v-row>
      </div>
      <!-- pagination -->
      <div v-if="!isLoading" class="page-div">
         <v-pagination
            dark
            :value="page"
            :length="Math.ceil(videoCount / 16)"
            :total-visible="7"
            @input="changePage($event)"
         ></v-pagination>
      </div>
   </v-container>
</template>

<script>
import http from "../assets/js/http-common.js";
export default {
   watch: {
      "$route.params.search_text": {
         handler() {
            this.doSearch();
         },
         immediate: true,
      },
   },
   data: () => ({
      videoCount: 0,
      videos: {},
      isLoading: false,
   }),
   methods: {
      changePage(newPage) {
         this.$router.push({ query: { ...this.$route.query, page: newPage } });
         window.scrollTo({ top: 0 });
         this.doSearch();
      },
      async doSearch() {
         this.isLoading = true;
         await http
            .get(
               "video/search?search=" +
                  this.$route.params.search_text +
                  "&page=" +
                  this.page
            )
            .then(({ data }) => {
               this.videoCount = data.data.count;
               this.videos = data.data.data;
            })
            .catch((err) => {
               console.log(err);
            });
         this.isLoading = false;
      },
   },
   computed: {
      page() {
         return parseInt(this.$route.query.page) || 1;
      },
   },
   components: {
      "video-img-container": () =>
         import("../components/video-img-container.vue"),
   },
};
</script>
<style lang="scss" scoped>
.title {
   text-align: center;
   margin: 30px 0;
   color: white;
}
.page-div {
   text-align: center;
   margin: 30px 0;
}
</style>
