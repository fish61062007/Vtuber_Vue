<template>
   <div>
      <div class="bg-div">
         <div class="avatar-div">
            <v-avatar class="avatar" size="240px">
               <img
                  style="aspect-radio: 1/1; object-fit: cover"
                  :src="avatar"
               />
            </v-avatar>
            <span class="username">{{ username }}</span>
            <div class="btn-div">
               <v-menu dark v-model="menu" offset-x>
                  <template v-slot:activator="{ on, attrs }">
                     <v-btn v-bind="attrs" v-on="on" icon top large>
                        <v-icon>mdi-cogs</v-icon>
                     </v-btn>
                  </template>
                  <v-list dark>
                     <v-list-item-group dark>
                        <v-dialog
                           dark
                           v-model="dialog"
                           persistent
                           max-width="640px"
                        >
                           <template v-slot:activator="{ on, attrs }">
                              <v-list-item
                                 dark
                                 v-bind="attrs"
                                 v-on="on"
                                 inactive
                                 >修改密碼</v-list-item
                              >
                           </template>
                           <!-- 修改密碼頁面 -->
                           <change-password
                              @close="
                                 dialog = false;
                                 menu = false;
                              "
                           ></change-password>
                        </v-dialog>
                        <v-list-item dark @click="selectFile()" inactive
                           >上傳頭像
                           <v-form class="d-none">
                              <v-file-input
                                 dark
                                 ref="file_input"
                                 v-model="file"
                                 accept="image/*"
                              ></v-file-input>
                           </v-form>
                           <v-dialog
                              dark
                              v-model="uploadDialog"
                              persistent
                              max-width="290"
                           >
                              <v-card class="text-center" dark>
                                 <v-avatar
                                    class="avatar"
                                    size="240px"
                                    v-if="checkFileType"
                                 >
                                    <img
                                       style="
                                          aspect-radio: 1/1;
                                          object-fit: cover;
                                       "
                                       :src="temp_avatar"
                                    />
                                 </v-avatar>
                                 <v-card-title v-else
                                    >選擇的檔案格式錯誤，僅能接受以下格式{{
                                       types
                                    }}
                                 </v-card-title>
                                 <v-card-actions class="text-center">
                                    <v-btn
                                       color="green darken-1"
                                       text
                                       @click="cancel()"
                                    >
                                       Cancel
                                    </v-btn>
                                    <v-btn
                                       color="green darken-1"
                                       text
                                       :disabled="!checkFileType"
                                       @click="upload()"
                                    >
                                       Upload
                                    </v-btn>
                                 </v-card-actions>
                              </v-card>
                           </v-dialog>
                        </v-list-item>
                     </v-list-item-group>
                  </v-list>
               </v-menu>
            </div>
         </div>
         <div>
            <v-tabs
               dark
               centered
               fixed-tabs
               background-color="#1e1e1e"
               color="primary"
            >
               <v-tab dark v-for="(item, i) in items" :key="i" :to="item.to">
                  <v-icon>{{ item.icon }}</v-icon>
                  <label>{{ item.text }}</label>
               </v-tab>
            </v-tabs>
         </div>
      </div>
      <router-view />
   </div>
</template>

<script>
import http from "../assets/js/http-common.js";

export default {
   components: {
      "change-password": () =>
         import("../components/app-user-change-password.vue"),
   },
   data: () => ({
      types: ["image/jpeg", "image/png"],
      file: null,
      menu: false,
      dialog: false,
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
            icon: "mdi-heart",
            to: { name: "Follow" },
         },
         {
            text: "歷史紀錄",
            icon: "mdi-history",
            to: { name: "History" },
         },
      ],
   }),
   computed: {
      checkFileType() {
         if (this.file) {
            return this.types.includes(this.file.type);
         }
         return false;
      },
      temp_avatar() {
         return URL.createObjectURL(this.file);
      },
      uploadDialog() {
         return !!this.file;
      },
      username() {
         return this.$store.state.username;
      },
      avatar() {
         return this.$store.state.avatar;
      },
   },
   methods: {
      selectFile() {
         this.$refs.file_input.$refs.input.click();
      },
      cancel() {
         this.file = null;
      },
      async upload() {
         const avatar = new FormData();
         avatar.append("file", this.file);
         await http
            .post("users/change_avatar", avatar)
            .then(({ data }) => {
               console.log(data);
               if (data.state == 2000) {
                  this.$store.commit("setAvatar", data.data);
               } else {
                  console.log(data.message);
               }
            })
            .catch(() => {});
         this.file = null;
      },
   },
};
</script>

<style lang="scss" scoped>
.bg-div {
   background: linear-gradient(135deg, white, #f06292);
}
.avatar-div {
   display: flex;
   flex-flow: row nowrap;
   justify-content: flex-start;
   align-items: flex-end;
   padding: 30px 0 10px 50px;
   text-align: center;
}
.btn-div {
   margin-left: 10px;
}
.username {
   font-size: 32px;
   font-weight: bold;
}
</style>
