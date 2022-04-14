<template>
   <div>
      <!-- <v-toolbar dark color="deep-purple" style="z-index: 1003 !important"> -->
      <v-app-bar dark color="deep-purple" style="z-index: 1003 !important" app>
         <div class="menu-div">
            <v-dialog
               fullscreen
               hide-overlay
               transition="dialog-top-transition"
               style="z-index: 1000 !important"
               v-model="dialog"
            >
               <template #activator="{ on, attrs }"
                  ><v-app-bar-nav-icon v-bind="attrs" v-on="on">
                  </v-app-bar-nav-icon>
               </template>
               <my-tag v-on:close-dialog="closeDialog"></my-tag>
            </v-dialog>
         </div>
         <router-link
            v-if="!showSearchBar"
            class="to-home"
            :to="{ name: 'Home', params: { flag: $store.state.flag } }"
         >
            <v-app-bar-title>My Project</v-app-bar-title>
            <!-- <v-toolbar-title>My Project</v-toolbar-title> -->
         </router-link>

         <v-spacer v-if="!showSearchBar" />

         <div v-if="!isSmall || showSearchBar" class="flex-grow-1">
            <v-text-field
               dark
               hide-details
               append-icon="mdi-magnify"
               single-line
               :label="this.$route.params.search_text || 'Search...'"
               placeholder="Search something..."
               solo
               clearable
               dense
               v-model="search_text"
               @click:append="search()"
               @keyup.enter="search()"
            ></v-text-field>
         </div>

         <v-spacer v-if="!showSearchBar" />

         <v-btn v-if="showSearchBar" icon @click="showSearchBar = false"
            ><v-icon>mdi-close</v-icon></v-btn
         >
         <div v-if="!showSearchBar" class="btns-div">
            <v-btn v-if="isSmall" icon rounded @click="showSearchBar = true">
               <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <template v-if="username">
               <my-user-menu />
            </template>
            <template v-else>
               <div class="login-div">
                  <v-btn :to="{ name: 'Login' }" color="primary" block>
                     login
                  </v-btn>
               </div>
            </template>
         </div>
      </v-app-bar>
      <!-- </v-toolbar> -->
   </div>
</template>

<script>
export default {
   data: () => ({
      dialog: false,
      search_text: "",
      showSearchBar: false,
   }),
   methods: {
      search() {
         this.$router.push({
            name: "Search",
            params: {
               search_text: this.search_text,
            },
         });
      },
      closeDialog() {
         this.dialog = false;
      },
   },
   computed: {
      username() {
         return this.$store.state.username;
      },
      isLogin() {
         return this.$store.state.isLogin;
      },
      isSmall() {
         return this.$vuetify.breakpoint.name === "xs";
      },
   },
   components: {
      "my-tag": () => import("./app-tag.vue"),
      "my-user-menu": () => import("./app-user-menu.vue"),
   },
};
</script>

<style lang="scss" scoped>
.to-home {
   color: white;
   text-decoration: none;
   margin-left: 1vw;
}
.btns-div {
   display: flex;
   flex-flow: row nowrap;
   align-items: center;
   justify-content: flex-start;
   margin-left: auto;
}
</style>

