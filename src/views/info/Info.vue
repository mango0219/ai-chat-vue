<template>
  <div>
    <div class="logoutBox">
      <van-button type="danger" @click="logout">
        退出登陆
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">


import {getLocalItem, removeCookieItem, removeLocalItem, setLocalItem} from "@/utils/localStore";
import router from "@/router";
import {logoutApi} from "@/api/user";
import {showConfirmDialog, showFailToast, showSuccessToast} from "vant";

function logout(){

  showConfirmDialog({
    title: '退出',
    message:
        '是否确认退出？',
    })
    .then(() => {
      const id = getLocalItem("user_id");
      const params = {
        id: id
      }
      logoutApi(params).then((res:any) => {
        if (res.code === 200) {
          showSuccessToast("退出成功");
          router.push("/")
          removeLocalItem("user_id");
          removeLocalItem("user_name");
          removeLocalItem("token");
        }else {
          showFailToast(res.msg);
        }
      })
    })
    .catch(() => {
    });
}

</script>

<script lang="ts">
export default {
  name: "Info"
}
</script>

<style scoped>
  .logoutBox {
    margin-top: 40%;
    width: 100%;
    text-align: center;
  }
</style>