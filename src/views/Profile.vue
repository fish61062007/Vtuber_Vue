<template>
   <v-container>
      <v-form
         ref="form"
         class="profile-form"
         v-model="valid"
         :disabled="disabled"
      >
         <v-text-field
            dark
            color="white"
            outlined
            label="Phone"
            append-icon="mdi-cellphone"
            maxlength="10"
            :rules="[rules.required, rules.phone]"
            v-model="form.phone"
            :error-messages="errorMessageForm.phone"
            @change="errorMessageForm.phone = ''"
         ></v-text-field>
         <v-text-field
            dark
            color="white"
            outlined
            label="Email"
            append-icon="mdi-email"
            :rules="[rules.required, rules.email]"
            v-model="form.email"
            :error-messages="errorMessageForm.email"
            @change="errorMessageForm.email = ''"
         ></v-text-field>
         <v-radio-group row v-model="form.gender" dark>
            <v-radio color="success" label="Male" :value="1"></v-radio>
            <v-radio color="success" label="Female" :value="0"></v-radio>
         </v-radio-group>
         <v-textarea
            dark
            v-model="form.intro"
            color="white"
            clearable
            clear-icon="mdi-close"
         >
            <template v-slot:label>
               <div>自我介紹 <small>(選填)</small></div>
            </template>
         </v-textarea>
         <v-row justify="space-around">
            <v-btn
               dark
               :color="disabled ? 'success' : 'error'"
               outlined
               @click="change()"
               width="100px"
               >{{ disabled ? "edit" : "cancel" }}</v-btn
            >
            <v-btn
               dark
               color="success"
               outlined
               :disabled="!valid || disabled"
               @click="save()"
               width="100px"
            >
               save
            </v-btn>
         </v-row>
      </v-form>
   </v-container>
</template>

<script>
import { mapState } from "vuex";
import http from "../assets/js/http-common.js";
export default {
   async beforeMount() {
      await http
         .get("users/get_info")
         .then(({ data }) => {
            if (data.state == 2000) {
               this.form = data.data;
            }
         })
         .catch(() => {
            this.$store.commit("clearUserInfo");
            // this.$router.go(0);
            this.$router.push({ name: "Home" });
         });
   },
   data: () => ({
      valid: false,
      disabled: true,
      form: {
         phone: "",
         email: "",
         gender: 1,
         intro: "",
      },
      errorMessageForm: {
         phone: "",
         email: "",
      },
   }),
   methods: {
      change() {
         if ((this.disabled = !this.disabled)) {
            this.$refs.form.resetValidation();
         }
      },
      save() {
         // var myHeaders = new Headers();
         // myHeaders.append("Content-Type", "application/json");
         // myHeaders.append(
         //    "Cookie",
         //    "JSESSIONID=623D958BF9C7D2098088D86286BDE263"
         // );

         // var raw = JSON.stringify({
         //    email: "T@T",
         //    phone: "0987654321",
         //    gender: 1,
         //    intro: "qqqq",
         // });

         // var requestOptions = {
         //    method: "POST",
         //    headers: myHeaders,
         //    body: raw,
         //    redirect: "follow",
         //    mode: "no-cors",
         // };

         // fetch("http://34.215.246.135:8080/users/change_info", requestOptions)
         //    .then((response) => response.text())
         //    .then((result) => console.log(result))
         //    .catch((error) => console.log("error", error));
         let form_data = new FormData();
         for (let key in this.form) {
            form_data.append(key, this.form[key]);
         }
         http
            .post("users/change_info", form_data)
            .then(({ data }) => {
               console.log(data);
               if (data.state == 2000) {
                  this.disabled = true;
               } else {
                  const message = data.message;
                  if (message.includes("手機")) {
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
   computed: {
      ...mapState(["rules"]),
   },
};
</script>
<style lang="scss" scoped>
.profile-form {
   padding: 3rem;
}
</style>
