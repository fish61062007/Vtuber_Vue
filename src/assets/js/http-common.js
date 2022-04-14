import axios from "axios";
import store from "../../store";

const http = axios.create({
   baseURL: "http://34.215.246.135:8080/",
   header: {
      "Content-Type": "application/json",
   },
   withCredentials: true,
});

http.interceptors.response.use(
   (res) => {
      return res;
   },
   (err) => {
      if (err.response.status == 401) {
         store.commit("setErrorDialog", true);
         setTimeout(() => {
            store.commit("setErrorDialog", false);
         }, 2000);
      }
      return Promise.reject(err);
   }
)

export default http;
