<template>
   <v-main>
      <v-container fluid fill-height>
         <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6 mt-6>
               <v-card dark>
                  <v-toolbar color="success">
                     <v-toolbar-title class="form-title"
                        >Register form
                     </v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                     <v-form v-model="valid">
                        <v-text-field
                           prepend-icon="mdi-account"
                           v-model="form.username"
                           label="Username"
                           maxlength="32"
                           type="text"
                           :rules="[rules.required, rules.username]"
                           :error-messages="errorMessageForm.username"
                           @input="errorMessageForm.username = ''"
                           @keyup.tab.prevent="
                              $refs.password.$refs.input.click()
                           "
                        >
                           <template v-slot:append-outer>
                              <v-tooltip bottom>
                                 <template v-slot:activator="{ on }">
                                    <v-icon v-on="on">
                                       mdi-help-circle-outline
                                    </v-icon>
                                 </template>
                                 長度需在8-32之間，且僅能使用英文字母和數字
                              </v-tooltip>
                           </template>
                        </v-text-field>
                        <v-text-field
                           ref="password"
                           prepend-icon="mdi-lock"
                           v-model="form.password"
                           label="Password"
                           maxlength="32"
                           :type="passwordVisible ? 'text' : 'password'"
                           :rules="[rules.required, rules.password]"
                           :append-icon="
                              passwordVisible
                                 ? 'mdi-eye-off-outline'
                                 : 'mdi-eye-outline'
                           "
                           @click:append="passwordVisible = !passwordVisible"
                           :error-messages="errorMessageForm.password"
                           @change="errorMessageForm.password = ''"
                           @keyup.tab.prevent="$refs.phone.$refs.input.click()"
                        >
                           <template v-slot:append-outer>
                              <v-tooltip bottom>
                                 <template v-slot:activator="{ on }">
                                    <v-icon v-on="on">
                                       mdi-help-circle-outline
                                    </v-icon>
                                 </template>
                                 長度需在8-32之間，且包含大小寫英文字母、數字及特殊符號，如:(~!@#$%^*,._)等
                              </v-tooltip>
                           </template>
                        </v-text-field>
                        <v-text-field
                           ref="phone"
                           prepend-icon="mdi-cellphone"
                           v-model="form.phone"
                           label="Phone"
                           type="text"
                           maxlength="10"
                           :rules="[rules.required, rules.phone]"
                           :error-messages="errorMessageForm.phone"
                           @change="errorMessageForm.phone = ''"
                           @keyup.tab.prevent="$refs.email.$refs.input.click()"
                        ></v-text-field
                        ><v-text-field
                           ref="email"
                           prepend-icon="mdi-email"
                           v-model="form.email"
                           label="Email"
                           type="text"
                           :rules="[rules.required, rules.email]"
                           :error-messages="errorMessageForm.email"
                           @change="errorMessageForm.email = ''"
                        ></v-text-field>
                        <v-radio-group v-model="form.gender" row mandatory>
                           <v-radio
                              color="success"
                              label="Male"
                              value="1"
                           ></v-radio>
                           <v-radio
                              color="success"
                              label="Female"
                              value="0"
                           ></v-radio>
                        </v-radio-group>
                        <v-card-actions class="v-card-login">
                           <v-btn
                              outlined
                              color="primary"
                              :to="{ name: 'Login' }"
                              >go back to Login</v-btn
                           >
                           <v-spacer></v-spacer>
                           <v-btn
                              color="success"
                              :disabled="!valid"
                              @click="reg()"
                              >Register</v-btn
                           >
                           <v-dialog
                              v-model="dialog"
                              hide-overlay
                              persistent
                              width="300"
                           >
                              <v-card color="deep-purple" dark>
                                 <v-card-text class="text-center">
                                    🔥註冊成功，正在跳轉至登入頁面...🔥
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
// import $ from "jquery";
export default {
   data: () => ({
      dialog: false,
      valid: false,
      passwordVisible: false,
      form: {
         username: "",
         password: "",
         gender: 1,
         phone: "",
         email: "",
      },
      errorMessageForm: {
         username: "",
         password: "",
         phone: "",
         email: "",
      },
   }),
   methods: {
      reg() {
         http
            .post("users/register", this.form)
            .then(({ data }) => {
               console.log(data);
               if (data.state == 2000) {
                  this.dialog = true;
               } else {
                  const message = data.message;
                  if (message.includes("使用者名稱")) {
                     this.errorMessageForm.username = message;
                  } else if (message.includes("密碼")) {
                     this.errorMessageForm.password = message;
                  } else if (message.includes("手機")) {
                     this.errorMessageForm.phone = message;
                  } else if (message.includes("email")) {
                     this.errorMessageForm.email = message;
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
   watch: {
      dialog(val) {
         if (!val) return;

         setTimeout(() => {
            this.dialog = false;
            this.$router.push({ name: "Login" });
         }, 2500);
      },
   },
   computed: {
      ...mapState(["rules"]),
   },
};
</script>
