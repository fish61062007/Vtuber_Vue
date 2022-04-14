<template>
   <v-card dark>
      <v-card-title>修改密碼</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
         <v-form ref="form" style="margin-top: 20px" v-model="valid">
            <v-text-field
               dark
               v-model="form.oldPassword"
               label="Old Password"
               maxlength="32"
               :type="oldVisible ? 'text' : 'password'"
               :rules="[rules.required]"
               :append-icon="
                  oldVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
               "
               @click:append="oldVisible = !oldVisible"
               :error-messages="errorMessageForm.oldPassword"
               @input="errorMessageForm.oldPassword = ''"
               color="white"
               outlined
            ></v-text-field>
            <v-text-field
               dark
               v-model="form.newPassword"
               label="New Password"
               maxlength="32"
               :type="newVisible ? 'text' : 'password'"
               :rules="[rules.required, rules.password]"
               :append-icon="
                  newVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
               "
               @click:append="newVisible = !newVisible"
               :error-messages="errorMessageForm.newPassword"
               @input="errorMessageForm.newPassword = ''"
               color="white"
               outlined
            ></v-text-field>
            <v-card-actions class="v-card-login">
               <v-btn dark outlined color="error" @click="close()"
                  >Cancel</v-btn
               >
               <v-spacer></v-spacer>
               <v-btn
                  dark
                  outlined
                  color="success"
                  :disabled="!valid"
                  @click="change()"
                  >Save</v-btn
               >
               <v-dialog
                  dark
                  v-model="dialog"
                  hide-overlay
                  persistent
                  width="300"
               >
                  <v-card color="deep-purple" dark>
                     <v-card-text class="text-center"> 修改成功 </v-card-text>
                  </v-card>
               </v-dialog>
            </v-card-actions>
         </v-form>
      </v-card-text>
   </v-card>
</template>
<script>
import { mapState } from "vuex";
import http from "../assets/js/http-common.js";
export default {
   data: () => ({
      dialog: false,
      valid: false,
      oldVisible: false,
      newVisible: false,
      form: {
         oldPassword: "",
         newPassword: "",
      },
      errorMessageForm: {
         oldPassword: "",
         newPassword: "",
      },
   }),
   methods: {
      change() {
         let form_data = new FormData();
         for (let key in this.form) {
            form_data.append(key, this.form[key]);
         }
         http
            .post("users/change_password", form_data)
            .then(({ data }) => {
               console.log(data);
               if (data.state == 2000) {
                  this.close();
                  this.dialog = true;
                  setTimeout(() => {
                     this.dialog = false;
                  }, 1500);
               } else {
                  const message = data.message;
                  if (message.includes("舊密碼")) {
                     this.errorMessageForm.oldPassword = message;
                  } else if (message.includes("密碼")) {
                     this.errorMessageForm.newPassword = message;
                  } else {
                     alert(message);
                  }
               }
            })
            .catch((err) => {
               console.log(err);
            });
      },
      close() {
         this.$refs.form.resetValidation();
         this.form = {
            oldPassword: "",
            newPassword: "",
         };
         this.oldVisible = false;
         this.newVisible = false;
         this.$emit("close");
      },
   },
   computed: {
      ...mapState(["rules"]),
   },
};
</script>
