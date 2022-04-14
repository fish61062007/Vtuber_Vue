<template>
   <v-container>
      <v-carousel dark cycle interval="3000" hide-delimiters height="auto">
         <v-carousel-item v-for="video in carouselVideos" :key="video.videoId">
            <carousel-img-container v-bind="video"> </carousel-img-container>
         </v-carousel-item>
      </v-carousel>
   </v-container>
</template>
<script>
import http from "../assets/js/http-common.js";
export default {
   async beforeMount() {
      http
         .get("video/carousel")
         .then(({ data }) => {
            if (data.state == 2000) {
               this.carouselVideos = data.data;
            }
         })
         .catch((err) => {
            console.log(err);
         });
   },
   components: {
      "carousel-img-container": () =>
         import("../components/carousel-img-container.vue"),
   },
   data: () => ({
      model: 0,
      carouselVideos: {},
   }),
};
</script>
<style lang="scss" scoped>
.skeleton {
   min-height: 90px !important;
   max-height: 540px !important;
   aspect-ratio: 16/9;
   .v-skeleton-loader__image {
      width: 100%;
      height: 100% !important;
   }
}
</style>
