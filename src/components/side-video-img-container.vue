<template>
   <v-row dense align="center">
      <v-col cols="12" md="5">
         <router-link
            style="text-decoration: none; color: inherit"
            :to="{ name: 'Watch', params: { video_id: videoId } }"
         >
            <div class="img-container">
               <v-img :src="img()" contain dark>
                  <div v-if="status == 'live'" class="live-icon">
                     <v-icon color="#FFFFFF" small>mdi-access-point</v-icon>
                     <h6>LIVE</h6>
                  </div>
                  <span class="video-topic">{{ topic }}</span>
               </v-img>
            </div>
         </router-link>
      </v-col>
      <v-col cols="12" md="7">
         <router-link
            style="text-decoration: none; color: inherit"
            :to="{ name: 'Watch', params: { video_id: videoId } }"
         >
            <h4 class="video-title">{{ title }}</h4>
         </router-link>
         <h5 class="available-time">{{ availableTime() }}</h5>
         <router-link
            style="text-decoration: none; color: inherit"
            :to="{ name: 'VtuberInfo', params: { channel_id: ytId } }"
         >
            <div class="ch-info">
               <v-avatar size="32" class="yt-avatar">
                  <v-img dark :src="avatar"></v-img>
               </v-avatar>
               <h5 class="yt-ch">{{ ytChannel }}</h5>
            </div>
         </router-link>
      </v-col>
   </v-row>
</template>

<script>
import moment from "../assets/mixinMoment/mixinMoment.vue";
export default {
   mixins: [moment],
   props: [
      "videoId",
      "status",
      "topic",
      "title",
      "avatar",
      "ytChannel",
      "ytId",
      "availableAt",
   ],
   methods: {
      img() {
         if (this.topic == "shorts") {
            return "https://i.ytimg.com/vi/" + this.videoId + "/mqdefault.jpg";
         }
         return "https://i.ytimg.com/vi/" + this.videoId + "/maxresdefault.jpg";
      },
      availableTime() {
         return this.moment(this.availableAt).format("yyyy/MM/DD (HH:mm)");
      },
   },
   data: () => ({}),
};
</script>

<style lang="scss" scoped>
.img-container {
   aspect-ratio: 16/9;
   margin: 0 auto;
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
   font-size: 12px;
   position: absolute;
   top: 0;
   right: 0;
   background-color: rgba($color: #000000, $alpha: 0.8);
   padding: 0.1% 1.4%;
}
.video-title {
   text-decoration: none;
   color: inherit;
   word-wrap: break-word;
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 2;
   -webkit-box-orient: vertical;
   color: white;
}
.ch-info {
   display: flex;
   flex-flow: row nowrap;
   justify-content: flex-start;
   align-items: center;
}
.yt-ch {
   color: #00b0ff;
   padding-left: 0.5em;
}
.available-time {
   color: white;
}
</style>
