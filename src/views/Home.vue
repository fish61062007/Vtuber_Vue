<template>
   <v-container>
      <my-carousel />
      <my-video-container title="newest" />
      <my-video-container title="upcoming" />
   </v-container>
</template>

<script>
export default {
   components: {
      "my-carousel": () => import("../components/app-carousel.vue"),
      "my-video-container": () => import("../components/video-container.vue"),
   },
};
</script>
