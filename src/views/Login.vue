<template>
   <v-main>
      <v-container fluid fill-height>
         <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6 mt-6>
               <v-card dark>
                  <v-toolbar color="primary">
                     <v-toolbar-title class="form-title"
                        >Login form</v-toolbar-title
                     >
                  </v-toolbar>
                  <v-card-text>
                     <v-form v-model="valid">
                        <v-text-field
                           v-model="form.username"
                           prepend-icon="mdi-account"
                           label="Username"
                           maxlength="32"
                           type="text"
                           :rules="[rules.required]"
                           :error-messages="errorMessageForm.username"
                           @input="errorMessageForm.username = ''"
                        ></v-text-field>
                        <v-text-field
                           v-model="form.password"
                           prepend-icon="mdi-lock"
                           label="Password"
                           maxlength="32"
                           :type="passwordVisible ? 'text' : 'password'"
                           :rules="[rules.required]"
                           :append-icon="
                              passwordVisible
                                 ? 'mdi-eye-off-outline'
                                 : 'mdi-eye-outline'
                           "
                           @click:append="passwordVisible = !passwordVisible"
                           :error-messages="errorMessageForm.password"
                           @input="errorMessageForm.password = ''"
                           @keyup.enter="login()"
                        ></v-text-field>
                        <v-card-actions class="v-card-login">
                           <v-btn
                              outlined
                              :to="{ name: 'Register' }"
                              color="success"
                           >
                              go to register
                           </v-btn>
                           <v-spacer></v-spacer>
                           <v-btn
                              outlined
                              color="primary"
                              :disabled="!valid"
                              @click="login()"
                              >Login</v-btn
                           >
                           <v-dialog
                              v-model="dialog"
                              hide-overlay
                              persistent
                              width="300"
                           >
                              <v-card color="deep-purple" dark>
                                 <v-card-text class="text-center">
                                    🔥登入成功，頁面跳轉中...🔥
                                    <v-progress-linear
                                       indeterminate
                                       color="white"
                                       class="mb-0"
                                    ></v-progress-linear>
                                 </v-card-text>
                              </v-card>
                           </v-dialog>
                        </v-card-actions>
                     </v-form>
                  </v-card-text>
               </v-card>
            </v-flex>
         </v-layout>
      </v-container>
   </v-main>
</template>

<script>
import { mapState } from "vuex";
import http from "../assets/js/http-common.js";
export default {
   data: () => ({
      dialog: false,
      valid: false,
      passwordVisible: false,
      form: {
         username: "",
         password: "",
      },
      errorMessageForm: {
         username: "",
         password: "",
      },
   }),
   methods: {
      login() {
         let form_data = new FormData();
         for (let key in this.form) {
            form_data.append(key, this.form[key]);
         }
         // console.log(form_data);
         http
            .post("users/login", form_data)
            .then(({ data }) => {
               if (data.state == 2000) {
                  this.dialog = true;
                  setTimeout(() => {
                     this.dialog = false;
                     this.$store.commit("setUserInfo", data.data);
                     let previous = sessionStorage.getItem("previous");
                     if (previous != undefined) {
                        this.$router.push({ path: previous });
                        sessionStorage.removeItem("previous");
                     } else {
                        this.$router.push({ name: "Home" });
                     }
                  }, 2000);
               } else {
                  const message = data.message;
                  if (message.includes("使用者名稱")) {
                     this.errorMessageForm.username = message;
                  } else if (message.includes("密碼")) {
                     this.errorMessageForm.password = message;
                  } else {
                     alert(message);
                  }
               }
            })
            .catch((err) => {
               console.log(err);
            });
      },
   },
   computed: {
      ...mapState(["rules"]),
   },
};
</script>
