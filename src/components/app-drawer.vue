<template>
   <v-navigation-drawer
      :value="drawer"
      app
      clipped
      disable-resize-watcher
      width="100vw"
      @input="$store.commit('changeDrawer', $event)"
   >
      <v-list nav dense>
         <!-- <v-list-item-group
        v-model="group"
        active-class="deep-purple--text text--accent-4"
      > -->
         <!-- <h1 class="text-center">Hololive-JP</h1>
        <v-list-item>
          <v-list-item-title class="text-center"
            >Generation-0</v-list-item-title
          >
        </v-list-item>
        <v-list-item>
          <v-list-item-title class="text-center"
            >Generation-0</v-list-item-title
          >
        </v-list-item>
        <v-list-item>
          <v-list-item-title class="text-center"
            >Generation-0</v-list-item-title
          >
        </v-list-item>
        <h1 class="text-center">Hololive-ID</h1>
        <h1 class="text-center">Hololive-EN</h1>
        <h1 class="text-center">Hololive-other</h1>
        <h1 class="text-center">Secret Ow&lt;</h1> -->
         <v-list-group :value="true">
            <template v-slot:activator>
               <v-list-item-title class="text-center"
                  >Hololive-JP</v-list-item-title
               >
            </template>
            <v-list-group :value="true" sub-group>
               <template v-slot:activator>
                  <v-list-item-title class="text-center"
                     >gen-0</v-list-item-title
                  >
               </template>
               <h3>test</h3>
               <h3>test</h3>
               <h3>test</h3>
               <h3>test</h3>
               <v-list-item-group> </v-list-item-group>
            </v-list-group>
            <v-list-group :value="true" no-action sub-group>
               <template v-slot:activator>
                  <v-list-item-title class="text-center"
                     >gen-1</v-list-item-title
                  >
               </template>
               <h3>test</h3>
               <h3>test</h3>
               <h3>test</h3>
               <h3>test</h3>
            </v-list-group>
            <!-- </v-list-item-group> -->
         </v-list-group>
      </v-list>
   </v-navigation-drawer>
</template>

<script>
export default {
   data: () => ({
      group: null,
   }),
   computed: {
      // 全域
      drawer() {
         return this.$store.state.drawer;
      },
   },
};
</script>
<style scoped>
.to-home {
   color: white;
   text-decoration: none;
   margin-left: 1vw;
}
</style>
