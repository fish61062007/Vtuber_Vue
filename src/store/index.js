import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
   state: { // 存變數的地方
      errorDialog: false,
      errorMessage: "登入過期，請重新登入",
      drawer: false,
      username: false,
      avatar: "",
      vtubers: {},
      rules: {
         required: (value) => !!value || "此欄位不得為空！",
         username: (value) => {
            if (/[^a-zA-Z0-9]/.test(value))
               return "使用者名稱僅能使用英文字母和數字";
            if (value.length < 8) return "使用者名稱的長度不得小於8";

            return true;
         },
         password: (value) => {
            if (value.length < 8) return "密碼的長度不得小於8";
            if (!/[a-z]/.test(value)) return "密碼須包含小寫英文字母";
            if (!/[A-Z]/.test(value)) return "密碼須包含大寫英文字母";
            if (!/[0-9]/.test(value)) return "密碼須包含數字";
            if (!/[^a-zA-Z0-9]/.test(value))
               return "密碼須包含至少一個特殊符號，如:(~!@#$%^&*,._)等";

            return true;
         },
         phone: (value) => {
            const pattern = /^09\d{8}$/;
            return pattern.test(value) || "請輸入正確的手機號碼";
         },
         email: (value) => {
            const pattern = /^\w+(\.\w+)*@\w+(\.[a-zA-Z]+)*$/;
            return pattern.test(value) || "請輸入正確的email";
         },
      },
   },
   // set
   mutations: {
      setErrorDialog(state, value) {
         state.errorDialog = value
      },
      setUserInfo(state, value) {
         state.username = value.username
         state.avatar = value.avatar || "defaultAvatar.png"
         state.avatar = "http://34.215.246.135:8080/home/ubuntu/static/upload/" + state.avatar
         sessionStorage.setItem("username", value.username);
      },
      clearUserInfo(state) {
         state.username = null
         state.avatar = null
         sessionStorage.clear();
      },
      setAvatar(state, value) {
         state.avatar = value
      },
      setUsername(state, value) {
         state.username = value
      },
      changeDrawer(state, value) {
         state.drawer = value
      },
      setVtubers(state, value) {
         state.vtubers = value
      }
   },
   actions: {},
   modules: {}
})
