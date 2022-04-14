<template>
   <div class="vtuber-page-div">
      <v-card flat dark>
         <v-img class="channel-banner" :src="vtuberInfo.banner"></v-img>
      </v-card>
      <v-container>
         <v-list-item dark>
            <v-list-item-avatar size="120px">
               <v-img dark :src="vtuberInfo.avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
               <v-list-item-title
                  ><h3>{{ vtuberInfo.ytChannel }}</h3></v-list-item-title
               >
               <v-list-item-subtitle
                  >{{
                     formatter(vtuberInfo.ytSubs)
                  }}
                  subscribers</v-list-item-subtitle
               >
               <v-list-item-subtitle
                  >{{ vtuberInfo.ytVideoCount }} videos</v-list-item-subtitle
               >
            </v-list-item-content>
            <div class="buttons">
               <v-btn dark icon @click="redirect(youtubeHref)"
                  ><v-icon size="32" color="#ff1515">mdi-youtube</v-icon></v-btn
               >
               <v-btn dark icon @click="redirect(twitterHref)"
                  ><v-icon size="32" color="#20c6ff">mdi-twitter</v-icon></v-btn
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
                           size="32"
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
      </v-container>
      <div>
         <v-tabs dark centered fixed-tabs color="#E91E63">
            <v-tab dark v-for="(item, i) in items" :key="i" :to="item.to">
               <v-btn>
                  <v-icon>{{ item.icon }}</v-icon>
               </v-btn>
               <label>{{ item.text }}</label>
            </v-tab>
         </v-tabs>
      </div>
      <router-view />
   </div>
</template>

<script>
import http from "../assets/js/http-common.js";
export default {
   watch: {
      "$route.params.channel_id": {
         handler() {
            http
               .get("vtuber/" + this.$route.params.channel_id)
               .then(({ data }) => {
                  this.vtuberInfo = data.data;
                  this.vtuberInfo.banner =
                     this.vtuberInfo.banner +
                     "=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj";
               })
               .catch((err) => {
                  console.log(err);
               });
            if (sessionStorage.getItem("username")) {
               http
                  .get("follow/check/" + this.$route.params.channel_id)
                  .then(({ data }) => {
                     this.isFollow = data.data;
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
      vtuberInfo: {},
      items: [
         {
            text: "簡介",
            icon: "mdi-account",
            to: { name: "VtuberInfo" },
         },
         {
            text: "影片",
            icon: "mdi-youtube",
            to: { name: "VtuberVideos" },
         },
      ],
      isFollow: false,
   }),
   computed: {
      youtubeHref() {
         return "https://www.youtube.com/channel/" + this.vtuberInfo.ytId;
      },
      twitterHref() {
         return "https://twitter.com/" + this.vtuberInfo.twitterName;
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
      setFollow() {
         const value = this.isFollow ? "delete" : "addNew";
         http
            .post("follow/" + value + "/" + this.$route.params.channel_id)
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
.channel-banner {
   height: calc(16.12903vw - 1px);
}
.buttons {
   display: flex;
   flex-flow: row nowrap;
   button {
      margin: 0 0.2vw;
   }
}
</style>
