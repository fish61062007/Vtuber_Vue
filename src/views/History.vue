<template>
   <div>
      <h3 class="title">共{{ videoCount }}條歷史紀錄</h3>
      <v-container>
         <v-row dense>
            <v-col
               v-for="video in videos"
               :key="video.videoId"
               cols="12"
               md="3"
            >
               <history-container
                  v-bind="video"
                  @delete="deleteHistory($event)"
               ></history-container>
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
      await this.getHistory();
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
            .get("history/?page=" + this.page)
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
         window.scrollTo({ top: 0, behavior: "smooth" });
      },
      getHistory() {
         http
            .get("history/?page=" + this.page)
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
      deleteHistory(videoId) {
         http
            .post("history/delete/" + videoId)
            .then(({ data }) => {
               console.log(data.state);
               if (data.state == 2000) {
                  this.getHistory();
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
      "history-container": () => import("../components/history-container.vue"),
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
