<template>
   <div class="tag-page-div">
      <v-toolbar>
         <!-- 佔位 -->
      </v-toolbar>
      <div class="container-div">
         <v-row v-for="(data, nation) in vtubers" :key="nation">
            <!-- nation -->
            <v-col cols="12" class="nation-div">
               <h2 class="nation-text">{{ nation }}</h2>
            </v-col>
            <v-col
               cols="12"
               v-for="(vtuber, generation) in data"
               :key="generation"
               class="generation-col"
            >
               <!-- generation -->
               <h3 class="generation-text">{{ generation }}</h3>
               <v-row>
                  <v-col
                     cols="6"
                     md="2"
                     sm="3"
                     v-for="{ avatar, jpName, enName, ytId } in vtuber"
                     :key="ytId"
                  >
                     <!-- avatar -->
                     <div class="name-div">
                        <router-link
                           v-on:click.native="$emit('close-dialog')"
                           style="text-decoration: none; color: inherit"
                           :to="{
                              name: 'VtuberInfo',
                              params: {
                                 channel_id: ytId,
                              },
                           }"
                        >
                           <v-avatar size="144px">
                              <img
                                 style="aspect-radio: 1/1; object-fit: cover"
                                 :src="avatar"
                              /> </v-avatar
                           ><br />
                           <!-- name -->
                           <span>{{ jpName }} </span>
                           <br />
                           <span>({{ enName }})</span>
                        </router-link>
                     </div>
                  </v-col>
               </v-row>
            </v-col>
         </v-row>
      </div>
   </div>
</template>

<script>
export default {
   data: () => ({
      // vtubers: {},
   }),
   computed: {
      vtubers() {
         return this.$store.state.vtubers;
      },
   },
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/settings/_variables";
.container-div {
   padding: 0 5vw 5vh;
   background-color: rgba(0, 0, 0, 0.9);
}
.nation-div {
   text-align: center;
   padding: 5vh 0;
}
.nation-text {
   width: 30vw;
   border: solid 2px #64ffda !important;
   margin: auto;
   color: #64ffda !important;
}
.generation-col {
   border: solid 2px #2196f3;
}
.generation-text {
   border-bottom: solid 1px #2196f3;
   margin-bottom: 10px;
   color: #2196f3;
}
.name-div {
   color: white;
   text-align: center;
}
</style>
