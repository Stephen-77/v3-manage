<template>
  <div>
    helloworld
    {{user.name}}
    <el-button type="primary">你是</el-button>
  </div>
</template>

<script setup lang="ts">
import useStore from '../store/index'
const {user}=useStore()
</script>

<style scoped>

</style>