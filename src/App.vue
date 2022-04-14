<template>
   <v-app>
      <my-navbar />
      <v-main>
         <router-view />
      </v-main>
      <v-dialog v-model="errorDialog" hide-overlay persistent width="300">
         <v-card color="error" dark>
            <v-card-text class="text-center">
               {{ errorMessage }}
            </v-card-text>
         </v-card>
      </v-dialog>
   </v-app>
</template>

<script>
import { mapState } from "vuex";
import http from "./assets/js/http-common.js";
export default {
   async beforeMount() {
      await http
         .get("vtuber/tag")
         .then(({ data }) => {
            if (data.state == 2000) {
               this.$store.commit("setVtubers", data.data);
            }
         })
         .catch(() => {});
      const isLogin = !!sessionStorage.getItem("username");
      if (isLogin) {
         await http
            .get("users/get_info")
            .then(({ data }) => {
               if (data.state == 2000) {
                  this.$store.commit("setUserInfo", data.data);
               } else {
                  this.$store.commit("clearUserInfo");
               }
            })
            .catch(() => {
               this.$store.commit("clearUserInfo");
            });
      }
   },
   name: "App",
   components: {
      "my-navbar": () => import("./components/app-navbar.vue"),
   },
   computed: {
      ...mapState(["errorMessage"]),
      errorDialog: {
         get() {
            return this.$store.state.errorDialog;
         },
         set(value) {
            this.$store.commit("setErrorDialog", value);
         },
      },
   },
};
</script>
<style lang="scss" scoped>
* {
   background-color: #121212;
}
</style>
