<template>
   <div>
      <router-link
         style="text-decoration: none; color: inherit"
         :to="{ name: 'Watch', params: { video_id: videoId } }"
      >
         <div class="img-container">
            <v-img
               dark
               :src="img()"
               :gradient="
                  status == 'upcoming'
                     ? '0deg, rgba(0,0,0,0.7), rgba(0,0,0,0.7)'
                     : undefined
               "
            >
               <div v-if="status == 'live'" class="live-icon">
                  <v-icon dark color="#FFFFFF" small>mdi-access-point</v-icon>
                  <h6>LIVE</h6>
               </div>
               <span class="video-topic">{{ topic }}</span>
            </v-img>
         </div>
      </router-link>
      <div class="video-info-div">
         <h4 class="video-title">{{ title }}</h4>
         <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
               <v-btn
                  v-bind="attrs"
                  v-on="on"
                  dark
                  class="ml-auto"
                  icon
                  color="red"
                  @click="unFavorite()"
               >
                  <v-icon dark size="26">{{ "mdi-close" }}</v-icon>
               </v-btn>
            </template>
            <span>取消收藏</span>
         </v-tooltip>
      </div>
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
      <div class="available-time">{{ availableTime() }}</div>
   </div>
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
         if (this.status == "upcoming") {
            return "將於" + this.moment(this.availableAt).fromNow() + "開始";
         }
         return this.moment(this.availableAt).format("yyyy/MM/DD (HH:mm)");
      },
      unFavorite() {
         this.$emit("delete", this.videoId);
      },
   },
   data: () => ({}),
};
</script>

<style lang="scss" scoped>
.img-container {
   position: relative;
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
.video-info {
   display: flex;
   flex-flow: row nowrap;
   justify-content: flex-start;
   align-items: center;
}
.video-info-div {
   display: flex;
   flex-flow: row nowrap;
   justify-content: flex-start;
   align-items: center;
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
}
.ch-info {
   display: flex;
   flex-flow: row nowrap;
   justify-content: flex-start;
   align-items: center;
}
.yt-ch {
   color: #00b0ff;
   padding-left: 1em;
}
.mask-div {
   background-color: rgba($color: #000000, $alpha: 1);
}
.available-time {
   color: white;
}
</style>
