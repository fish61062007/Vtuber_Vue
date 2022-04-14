<template>
   <router-link
      style="text-decoration: none; color: inherit"
      :to="{ name: 'Watch', params: { video_id: videoId } }"
   >
      <div class="img-container">
         <v-img dark :src="img(videoId)">
            <div v-if="status == 'live'" class="live-icon">
               <v-icon color="#FFFFFF">mdi-access-point</v-icon>
               <h4>&nbsp;LIVE</h4>
            </div>
            <span class="video-topic">{{ topic }}</span>
            <h2 class="video-title">
               {{ title }}
            </h2>
         </v-img>
      </div>
   </router-link>
</template>

<script>
export default {
   props: ["videoId", "status", "topic", "title"],
   methods: {
      img(videoId) {
         return "https://i.ytimg.com/vi/" + videoId + "/maxresdefault.jpg";
      },
   },
   data: () => ({}),
};
</script>

<style lang="scss" scoped>
.img-container {
   min-height: 90px;
   max-height: 540px;
   margin: 0 auto;
   aspect-ratio: 16/9;
}
.live-icon {
   display: flex;
   flex-flow: row nowrap;
   justify-content: flex-start;
   align-items: center;
   border-radius: 20px;
   position: absolute;
   top: 1.6%;
   left: 0.9%;
   padding: 0.1% 1.4%;
   background-color: rgba($color: #ff0000, $alpha: 1);
}
.video-topic {
   font-size: 18px;
   position: absolute;
   top: 0;
   right: 0;
   background-color: rgba($color: #000000, $alpha: 0.8);
   padding: 0.1% 1.4%;
}
.video-title {
   position: absolute;
   bottom: 0;
   left: 0;
   right: 0;
   background-color: rgba($color: #000000, $alpha: 0.8);
   padding: 0.1em 0.5em;
   max-width: 960px;
   word-wrap: break-word;
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 2;
   -webkit-box-orient: vertical;
}
</style>
