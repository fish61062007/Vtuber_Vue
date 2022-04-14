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
// import http from "../assets/js/http-common.js";
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
         http
            .post("users/change_info", this.form)
            .then(({ data }) => {
               console.log(data);
               if (data.state == 2000) {
                  this.disabled = true;
                  // this.change();
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
