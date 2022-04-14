<template>
   <div>
      <h3 class="title">共{{ videoCount }}部收藏影片</h3>
      <v-container>
         <v-row dense>
            <v-col
               v-for="video in videos"
               :key="video.videoId"
               cols="12"
               md="3"
            >
               <favorite-container
                  v-bind="video"
                  @delete="deleteFavorite($event)"
               ></favorite-container>
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
   async beforeMount() {
      await this.getFavorite();
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
         this.getFavorite();
         window.scrollTo({ top: 0, behavior: "smooth" });
      },
      getFavorite() {
         http
            .get("favorite/?page=" + this.page)
            .then(({ data }) => {
               if (data.state == 2000) {
                  this.videoCount = data.data.count;
                  this.videos = data.data.data;
               }
            })
            .catch(() => {
               this.$store.commit("clearUserInfo");
               this.$router.push({ name: "Home" });
            });
      },
      deleteFavorite(videoId) {
         http
            .post("favorite/delete/" + videoId)
            .then(({ data }) => {
               if (data.state == 2000) {
                  this.getFavorite();
               } else {
                  this.$router.push({ name: "Login" });
               }
            })
            .catch(() => {
               this.$router.push({ name: "Login" });
            });
      },
   },
   components: {
      "favorite-container": () =>
         import("../components/favorite-container.vue"),
   },
};
</script>

<style lang="scss" scoped>
.page-div {
   text-align: center;
   margin: 30px 0;
}
.title {
   color: white;
   text-align: center;
   margin-top: 10px;
}
</style>
