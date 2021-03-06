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
      //???????????????????????? login / register??????
      if (to.name == "Login" || to.name == "Register") {
         return next({
            name: "Home"
         });
      }
   } else {
      //??????????????????????????????????????????????????????
      const requireAuth = to.matched.some(
         (record) => record.meta.requireAuth
      );
      if (requireAuth) {
         return next({
            name: "Home"
         });
      }
      //?????????????????????????????????????????????
      if (to.name == "Login") {
         if (from.name != "Login" && from.name != "Register" && from.name != null) {
            sessionStorage.setItem("previous", from.path);
         }
      }
   }
   next();
})
export default router
