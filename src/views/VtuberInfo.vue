<template>
   <div class="info-div">
      <v-img
         dark
         class="bg-img"
         :src="vtuberInfo.tachie"
         contain
         height="800px"
      ></v-img>
      <v-container>
         <v-row class="flex-column-reverse flex-md-row">
            <v-col cols="12" md="8">
               <v-list dark style="text-align: center" class="list-div" light>
                  <v-list-item-title class="list-title"
                     ><h1>DATA</h1></v-list-item-title
                  >
                  <v-list-item-title class="list-item"
                     ><h3>
                        日文名字：{{ vtuberInfo.jpName }}
                     </h3></v-list-item-title
                  >
                  <v-list-item-title class="list-item"
                     ><h3>
                        英文名字：{{ vtuberInfo.enName }}
                     </h3></v-list-item-title
                  >
                  <v-list-item-title class="list-item"
                     ><h3>
                        組別：{{ vtuberInfo.generation }}
                     </h3></v-list-item-title
                  >
                  <v-list-item-title class="list-item"
                     ><h3>
                        生日：{{ birthday(vtuberInfo.birthday) }}
                     </h3></v-list-item-title
                  >
                  <v-list-item-title class="list-item"
                     ><h3>
                        出道日期：{{ debut(vtuberInfo.debut) }}
                     </h3></v-list-item-title
                  >
                  <v-list-item-title class="list-item"
                     ><h3>
                        粉絲稱呼：{{ vtuberInfo.fanName }}
                     </h3></v-list-item-title
                  >
                  <v-list-item-title class="list-item"
                     ><h3>
                        twitter：{{ vtuberInfo.twitterName }}
                     </h3></v-list-item-title
                  >
               </v-list>
            </v-col>
            <v-col cols="12" md="4">
               <v-img
                  max-height="550px"
                  contain
                  :src="vtuberInfo.tachie"
               ></v-img>
            </v-col>
         </v-row>
      </v-container>
   </div>
</template>

<script>
import moment from "../assets/mixinMoment/mixinMoment.vue";
import http from "../assets/js/http-common.js";
export default {
   mixins: [moment],
   watch: {
      "$route.params.channel_id": {
         handler() {
            http
               .get("vtuber/" + this.$route.params.channel_id)
               .then(({ data }) => {
                  this.vtuberInfo = data.data;
               })
               .catch((err) => {
                  console.log(err);
               });
         },
         immediate: true,
      },
   },
   data: () => ({
      vtuberInfo: {},
   }),
   methods: {
      birthday(value) {
         return this.moment(value).format("MMMDo");
      },
      debut(value) {
         return this.moment(value).format("L");
      },
   },
};
</script>
<style lang="scss" scoped>
.info-div {
   position: relative;
}
.bg-img {
   position: absolute;
   top: 0;
   right: 20vw;
   opacity: 0.15;
}
.list-title {
   border-top: 2px solid #f06292;
   border-top-left-radius: 40px;
   border-bottom-right-radius: 40px;
   border-bottom: 2px solid #f06292;
   padding: 2em 0;
}
.list-item {
   border-bottom: 2px dashed #f06292;
   margin: 2em 0;
}
</style>
