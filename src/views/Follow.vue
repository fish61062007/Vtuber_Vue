<template>
   <div>
      <h3 class="title">
         {{ text }}
      </h3>
      <v-container>
         <v-row>
            <v-col
               v-for="follow in follows"
               :key="follow.followId"
               cols="12"
               md="6"
            >
               <v-card class="follow-channel" outlined dark>
                  <router-link
                     style="text-decoration: none; color: inherit"
                     :to="{
                        name: 'VtuberInfo',
                        params: {
                           channel_id: follow.ytId,
                        },
                     }"
                  >
                     <v-avatar size="144px">
                        <img
                           style="aspect-radio: 1/1; object-fit: cover"
                           :src="follow.avatar"
                        />
                     </v-avatar>
                  </router-link>
                  <div>
                     <v-card-title class="chTitle">{{
                        follow.ytChannel
                     }}</v-card-title>
                     <v-card-subtitle
                        >{{
                           formatter(follow.ytSubs)
                        }}
                        subscribers</v-card-subtitle
                     >
                     <v-card-text>{{ follow.ytVideoCount }} videos</v-card-text>
                  </div>
                  <div class="delete-btn">
                     <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                           <v-btn
                              v-bind="attrs"
                              v-on="on"
                              dark
                              class="ml-auto"
                              icon
                              color="red"
                              @click="deleteFollow(follow.ytId)"
                           >
                              <v-icon dark size="26">{{ "mdi-close" }}</v-icon>
                           </v-btn>
                        </template>
                        <span>取消關注</span>
                     </v-tooltip>
                  </div>
               </v-card>
            </v-col>
         </v-row>
      </v-container>
   </div>
</template>

<script>
import http from "../assets/js/http-common.js";
export default {
   async beforeMount() {
      await this.getFollow();
   },
   data: () => ({
      followCount: 0,
      follows: {},
   }),
   computed: {
      text() {
         if (this.followCount == 0) {
            return "尚未關注任何頻道";
         }
         return "共關注 " + this.followCount + " 個頻道";
      },
      youtubeHref() {
         return "https://www.youtube.com/channel/" + this.follows.ytId;
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
      getFollow() {
         http
            .get("follow/")
            .then(({ data }) => {
               if (data.state == 2000) {
                  this.follows = data.data;
                  this.followCount = data.data.length;
               }
            })
            .catch(() => {
               this.$store.commit("clearUserInfo");
               this.$router.push({ name: "Home" });
            });
      },
      deleteFollow(ytId) {
         http
            .post("follow/delete/" + ytId)
            .then(({ data }) => {
               if (data.state == 2000) {
                  this.getFollow();
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
.title {
   text-align: center;
   margin-top: 10px;
   color: white;
}
.follow-channel {
   display: flex;
   flex-flow: row nowrap;
   align-items: center;
   justify-content: start;
   padding: 10px;
   padding-right: 0;
   border-color: aqua;
}
.chTitle {
   display: inline-block;
   height: calc(2em * 1.1 + 32px);
   line-height: 1.1;
   vertical-align: text-top;
}
.delete-btn {
   margin-left: auto;
   margin-bottom: auto;
}
</style>
