<template>
   <v-menu
      dark
      v-model="menu"
      min-width="350px"
      offset-y
      :close-on-content-click="false"
   >
      <!-- menu controller -->
      <template v-slot:activator="{ on, attrs }">
         <div class="user-div" v-bind="attrs" v-on="on">
            <!-- avatar -->
            <v-avatar>
               <img
                  style="aspect-radio: 1/1; object-fit: cover"
                  :src="avatar"
               />
            </v-avatar>
         </div>
      </template>

      <!-- menu data -->
      <v-list shaped>
         <v-list-item inactive>
            <v-list-item-avatar size="120px">
               <img
                  style="aspect-radio: 1/1; object-fit: cover"
                  :src="avatar"
               />
            </v-list-item-avatar>
            <v-list-item-title style="font-size: 24px">{{
               username
            }}</v-list-item-title>
         </v-list-item>

         <v-divider class="mb-2"></v-divider>

         <v-list-item-group v-model="selection">
            <v-list-item
               inactive
               v-for="(item, i) in items"
               :key="i"
               @click="itemClick(item.to)"
            >
               <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
               </v-list-item-icon>
               <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout()">
               <v-list-item-icon>
                  <v-icon>mdi-logout-variant</v-icon>
               </v-list-item-icon>
               <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
         </v-list-item-group>
      </v-list>
   </v-menu>
</template>
<script>
import http from "../assets/js/http-common.js";
export default {
   data: () => ({
      selection: null,
      menu: false,
      items: [
         {
            text: "個人資料",
            icon: "mdi-account",
            to: { name: "Profile" },
         },
         {
            text: "收藏的影片",
            icon: "mdi-star",
            to: { name: "Favorite" },
         },
         {
            text: "關注的頻道",
            icon: "mdi-heart-outline",
            to: { name: "Follow" },
         },
         {
            text: "歷史紀錄",
            icon: "mdi-history",
            to: { name: "History" },
         },
      ],
   }),
   methods: {
      clear() {
         this.selection = null;
      },
      itemClick(to) {
         this.menu = false;
         this.$router.push(to).catch(() => {});
         console.log(this.selection);
      },
      logout() {
         http
            .get("users/logout")
            .then(({ data }) => {
               if (data.state == 2000) {
                  console.log("登出");
                  this.$store.commit("clearUserInfo");
                  const requireAuth = this.$route.matched.some(
                     (record) => record.meta.requireAuth
                  );
                  if (requireAuth) {
                     this.$router.push({ name: "Home" });
                  }
               }
            })
            .catch((err) => {
               console.log(err);
            });
      },
   },
   computed: {
      username() {
         return this.$store.state.username;
      },
      avatar() {
         return this.$store.state.avatar;
      },
   },
};
</script>
<style lang="scss" scoped>
.user-div {
   margin-left: auto;
   margin-right: 1vw;
}
</style>
