<template>
   <div class="player-page-div">
      <v-row>
         <v-col cols="12" md="7">
            <div style="aspect-ratio: 16/9">
               <iframe
                  width="100%"
                  height="100%"
                  :src="
                     'https://www.youtube.com/embed/' + $route.params.video_id
                  "
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
               ></iframe>
            </div>
            <h5 class="available-time">{{ availableTime() }}</h5>
            <div class="video-info-div">
               <h2 class="video-title">{{ videoInfo.title }}</h2>
               <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                     <v-btn
                        v-bind="attrs"
                        v-on="on"
                        dark
                        class="ml-auto"
                        icon
                        :color="isFavorite ? 'orange' : undefined"
                        @click="setFavorite()"
                     >
                        <v-icon dark size="26">{{
                           isFavorite ? "mdi-star" : "mdi-star-outline"
                        }}</v-icon>
                     </v-btn>
                  </template>
                  <span>{{ isFavorite ? "取消收藏" : "收藏一下" }}</span>
               </v-tooltip>
            </div>
            <div class="channel-div">
               <v-list-item dark>
                  <router-link
                     :to="{
                        name: 'VtuberInfo',
                        params: { channel_id: videoInfo.ytId },
                     }"
                  >
                     <v-list-item-avatar size="100px">
                        <v-img dark :src="videoInfo.avatar"></v-img>
                     </v-list-item-avatar>
                  </router-link>
                  <v-list-item-content>
                     <v-list-item-title>
                        <router-link
                           style="text-decoration: none; color: inherit"
                           :to="{
                              name: 'VtuberInfo',
                              params: { channel_id: videoInfo.ytId },
                           }"
                        >
                           <h3 class="yt-ch">
                              {{ videoInfo.ytChannel }}
                           </h3>
                        </router-link></v-list-item-title
                     >
                     <v-list-item-subtitle
                        >{{
                           formatter(videoInfo.ytSubs)
                        }}
                        subscribers</v-list-item-subtitle
                     >
                  </v-list-item-content>
                  <div class="buttons">
                     <v-btn dark icon @click="redirect(youtubeHref)"
                        ><v-icon dark size="32" color="#ff1515"
                           >mdi-youtube</v-icon
                        ></v-btn
                     >
                     <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                           <v-btn
                              dark
                              icon
                              @click="setFollow()"
                              v-bind="attrs"
                              v-on="on"
                              ><v-icon
                                 dark
                                 size="26"
                                 :color="isFollow ? '#E91E63' : undefined"
                                 >{{
                                    isFollow ? "mdi-heart" : "mdi-heart-outline"
                                 }}</v-icon
                              ></v-btn
                           >
                        </template>
                        <span>{{ isFollow ? "取消關注" : "關注一下" }}</span>
                     </v-tooltip>
                  </div>
               </v-list-item>
            </div>
         </v-col>
         <v-col cols="12" md="5">
            <my-video-sidebar v-bind:videoId="videoInfo.video_id">
            </my-video-sidebar>
         </v-col>
      </v-row>
   </div>
</template>

<script>
import http from "../assets/js/http-common.js";
import moment from "../assets/mixinMoment/mixinMoment.vue";
export default {
   mixins: [moment],
   watch: {
      "$route.params.video_id": {
         handler() {
            http
               .get("video/" + this.$route.params.video_id)
               .then(({ data }) => {
                  this.videoInfo = data.data;
                  if (sessionStorage.getItem("username")) {
                     return http.get("follow/check/" + this.videoInfo.ytId);
                  }
               })
               .then(({ data }) => {
                  this.isFollow = data.data;
               })
               .catch((err) => {
                  console.log(err);
               });
            if (sessionStorage.getItem("username")) {
               http
                  .get("favorite/check/" + this.$route.params.video_id)
                  .then(({ data }) => {
                     this.isFavorite = data.data;
                  })
                  .catch((err) => {
                     console.log(err.state);
                  });
               http
                  .post("history/addNew/" + this.$route.params.video_id)
                  .then(({ data }) => {
                     console.log(data.state);
                  })
                  .catch((err) => {
                     console.log(err.state);
                  });
            }
         },
         immediate: true,
      },
   },
   data: () => ({
      isFavorite: false,
      isFollow: false, //vtuber收藏
      videoInfo: {},
   }),
   components: {
      "my-video-sidebar": () => import("../components/video-sidebar.vue"),
   },
   computed: {
      youtubeHref() {
         return "https://www.youtube.com/channel/" + this.videoInfo.ytId;
      },
   },
   methods: {
      redirect(value) {
         window.open(value);
      },
      formatter(value) {
         if (value < 1000) return value;
         if (value < Math.pow(1000, 2)) return value / 1000 + "K";
         if (value < Math.pow(1000, 3)) return value / Math.pow(1000, 2) + "M";
      },
      availableTime() {
         return this.moment(this.videoInfo.availableAt).format(
            "yyyy/MM/DD (HH:mm)"
         );
      },
      setFavorite() {
         const value = this.isFavorite ? "delete" : "addNew";
         http
            .post("favorite/" + value + "/" + this.$route.params.video_id)
            .then(({ data }) => {
               if (data.state == 2000) {
                  this.isFavorite = !this.isFavorite;
               } else {
                  this.$router.push({ name: "Login" });
               }
            })
            .catch(() => {
               this.$router.push({ name: "Login" });
            });
      },
      setFollow() {
         const value = this.isFollow ? "delete" : "addNew";
         http
            .post("follow/" + value + "/" + this.videoInfo.ytId)
            .then(({ data }) => {
               if (data.state == 2000) {
                  this.isFollow = !this.isFollow;
               } else {
                  this.$router.push({ name: "Login" });
               }
            })
            .catch(() => {
               this.$router.push({ name: "Login" });
            });
      },
   },
};
</script>

<style lang="scss" scoped>
.player-page-div {
   padding: 10px;
}
.video-info-div {
   display: flex;
   flex-flow: row nowrap;
   justify-content: flex-start;
   align-items: center;
   .video-title {
      word-wrap: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: white;
   }
}
.available-time {
   color: white;
}
.channel-div {
   border-top: 2px #f06292 solid;
   border-top-left-radius: 30px;
   border-bottom: 2px #f06292 solid;
   border-bottom-right-radius: 30px;
   padding: 10px 0;
   margin: 5px 0;
}
.yt-ch {
   color: #00b0ff;
}
.buttons {
   display: flex;
   flex-flow: row wrap;
   button {
      margin: 0 0.2vw;
   }
}
</style>
