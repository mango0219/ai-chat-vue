<template>
  <div>
    <van-nav-bar
        title="Ai Chat"
        left-text="返回"
        left-arrow
        @click-left="back"
    />


  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
function back() {
  history.back();
}

const route = useRoute()
let sessionId=route.query.sessionId;
console.log(sessionId);

</script>

<script lang="ts">
export default {
  name: "Chat"
}
</script>

<style scoped>

</style>