<template>
  <div>
      <router-view></router-view>
      
  </div>
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<style lang="scss">
*{
  padding: 0 ;
  margin: 0 ;
  box-sizing: border-box;
}
body,html{
  width: 100% !important;
  padding: 0 !important;
  margin: 0;
}

</style>