// import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import store from "../store/index"

Vue.use(VueRouter)

const routes = [{
      path: '/',
      name: 'Home',
      component: Home
   },
   {
      path: '/videos',
      name: 'Videos',
      component: () => import('../views/Videos.vue')
   },
   {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
   },
   {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register.vue')
   },
   {
      path: '/watch/:video_id',
      name: 'Watch',
      component: () => import('../views/VideoPlayer.vue')
   },
   {
      path: '/channel/:channel_id',
      component: () => import('../views/Vtuber.vue'),
      children: [{
         path: "",
         redirect: "info",
      }, {
         path: "info",
         name: "VtuberInfo",
         component: () => import('../views/VtuberInfo.vue')
      }, {
         path: "videos",
         name: "VtuberVideos",
         component: () => import('../views/VtuberVideos.vue')
      }]
   },
   {
      path: '/my',
      component: () => import('../views/User.vue'),
      children: [{
         path: "",
         redirect: "profile",
      }, {
         path: "profile",
         name: "Profile",
         component: () => import('../views/Profile.vue'),
      }, {
         path: "favorite",
         name: "Favorite",
         component: () => import('../views/Favorite.vue'),
      }, {
         path: "follow",
         name: "Follow",
         component: () => import('../views/Follow.vue'),
      }, {
         path: "history",
         name: "History",
         component: () => import('../views/History.vue'),
      }],
      meta: {
         requireAuth: true
      },
   },
   {
      path: '/search/:search_text',
      name: 'Search',
      component: () => import('../views/Search.vue')
   },
]

const router = new VueRouter({
   routes
})
router.beforeEach((to, from, next) => {
   const isLogin = !!sessionStorage.getItem("username");
   console.log("isLogin: " + isLogin);
   if (isLogin) {
      //登入後不允許訪問 login / register頁面
      if (to.name == "Login" || to.name == "Register") {
         return next({
            name: "Home"
         });
      }
   } else {
      //未登入時不允許訪問需要登入權限的頁面
      const requireAuth = to.matched.some(
         (record) => record.meta.requireAuth
      );
      if (requireAuth) {
         return next({
            name: "Home"
         });
      }
      //試圖使用登入後才能使用的功能時
      if (to.name == "Login") {
         if (from.name != "Login" && from.name != "Register" && from.name != null) {
            sessionStorage.setItem("previous", from.path);
         }
      }
   }
   next();
})
export default router
