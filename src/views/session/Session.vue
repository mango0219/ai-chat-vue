<template>
  <div>
    <div class="my_head">Chat List.</div>
    <van-floating-bubble  axis="xy" magnetic="x" icon="chat" @click="newChat" />
    <van-pull-refresh  v-model="refLoading" @refresh="onRefresh">
      <van-list
          style="margin-top: 50px"
          :finished="finished"
          finished-text="没有更多了"
      >
        <van-cell  v-for="(item,index) in list" :key="index">
          <van-swipe-cell>
            <div class="listItem" @click="toDetail(item)">
              <span class="leftItem"></span>
              <span class="rightItem">
            <div class="topItem">{{item.title}}</div>
            <div class="bottomItem">{{item.createTime}}</div>
          </span>
            </div>
            <template #right>
              <van-button square type="danger" text="删除" class="delete-button" @click="del(item)" />
            </template>
          </van-swipe-cell>
        </van-cell>
      </van-list>
    </van-pull-refresh>

  </div>
</template>

<script setup lang="ts">

import {onMounted, reactive, ref, toRef} from "vue";
import {createSessionApi, deleteSessionApi, getSessionListApi} from "@/api/session";
import {getLocalItem} from "@/utils/localStore";
import router from "@/router";
import {showFailToast, showSuccessToast} from "vant";


// 下拉刷新
let refLoading = ref(false)
function onRefresh(){
  refLoading.value = true;
  getSessionList();
}

// 列表展示
let list = ref([{title:'',createTime:''}])
list.value = []
let finished = ref(false);
function getSessionList(){
  const params = {
    userId: getLocalItem("user_id")
  }
  getSessionListApi(params).then((response:any) => {
    if (response.code === 200) {
      list.value = response.data;
    }else {
      showFailToast(response.msg);
    }
    finished.value = true;
    $_finished();
  })
}
getSessionList();

// 新会话
function newChat(){
  const param = {
    userId: getLocalItem("user_id")
  }
  createSessionApi(param).then((response:any) => {
    if (response.code === 200) {
      router.push({
        name:"chat",
        query : {
          sessionId: response.data
        }
      })
    }else {
      showFailToast(response.msg);
    }
  })
}

// 删除会话
function del(item:any) {
  deleteSessionApi(item).then((response:any) => {
    if (response.code === 200){
      showSuccessToast(response.msg);
      setTimeout(()=>{
        onRefresh();
      },1000);
    }else {
      showFailToast(response.msg);
    }
  })
}

function $_finished() {
  refLoading.value = false;
}

function toDetail(item:any){
  router.push({
    name:"chat",
    query: {
     sessionId: item.id
    }
  })
}

</script>

<script lang="ts">
export default {
  name: "Session"
}
</script>

<style scoped>
.listItem {
  width: 100%;
  height: 100px;
  margin-top: 3%;
  border-radius: 20px;
  box-shadow:2px 2px 4px 2px rgba(0, 0, 0, 0.2);
}
.leftItem {
  display: inline-block;
  vertical-align:middle;
  width: 5%;
  height: 100%;
  background-color: #52b5a9 ;
}
.rightItem {
  display: inline-block;
  vertical-align:middle;
  width: 95%;
  height: 100%;
  background-color: #c2ddd6;
}
.topItem {
  box-sizing: border-box;
  height: 50%;
  width: 100%;
  font-family: Monaco;
  padding: 3%;
  font-size: 16px;
  font-weight: 500;
}
.bottomItem {
  box-sizing: border-box;
  height: 50%;
  width: 100%;
  font-family: Monaco;
  padding: 3%;
}

.delete-button {
  height: 100px;;
}

.my_head {
  position: fixed;
  top: 0;
  z-index: 9;
  background-color: #ffffff;
  width: 100%;
  height: 70px;
  font-weight: 600;
  font-size: 20px;
  font-family: Monaco;
  text-align: center;
  line-height: 70px;
}

</style>