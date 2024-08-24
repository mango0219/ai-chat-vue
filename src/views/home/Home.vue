<template>
  <div>

    <van-tabbar v-model="active">
      <van-tabbar-item to="/home/session" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item to="/home/info" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>

    <router-view/>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";

const active = ref(0);


</script>


<script lang="ts">
export default {
  name: "home"
}
</script>

<style scoped>

</style>