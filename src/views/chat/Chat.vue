<template>
  <div>
    <van-nav-bar
        title="Ai Chat"
        left-text="返回"
        left-arrow
        :fixed="true"
        :placeholder="true"
        @click-left="back"
    />

    <div class="main">
      <div class="assistantBox chatBox">
        您好，我是您的专属助手，请问有什么可以帮助您的？
      </div>

      <div v-for="(item,index) in chatList" :key="index" :class="item.messageType==='USER'?'rightBox':''">
        <div  :class="item.messageType==='USER'?'chatBox rightBackBox':'chatBox leftBackBox'">
          {{item.textContent}}
        </div>
      </div>

    </div>

    <div class="inputBox">
      <van-row>
        <van-col :span="18" :offset="1">
          <van-field
              class="myInput"
              v-model="userInput"
              center
              clearable
              placeholder="请输入"
          >
          </van-field>
        </van-col>
        <van-col :span="4">
          <div class="btnBox">
            <van-button size="small" @click="sendMessage" type="primary" class="sendBtn">发送</van-button>
          </div>
        </van-col>
      </van-row>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import {onMounted, type Reactive, reactive, type Ref, ref} from "vue";
import { SSE } from 'sse.js'
import $config from "@/config/config";
import {getLocalItem} from "@/utils/localStore";
import "@/views/chat/Chat.vue";
import {getMessageListApi} from "@/api/message";

function back() {
  history.back();
}

const route = useRoute()
let sessionId=route.query.sessionId;

let chatList:Reactive<Message[]> = reactive([])

function getMessageList(){
  const params = {
    sessionId:sessionId
  }
  getMessageListApi(params).then((res) => {
    // chatList = chatList.concat(res.data);
    // chatList = reactive([...chatList,...res.data])
    chatList.splice(chatList.length, 0, ...res.data);
  })
}
getMessageList();

let userInput:any = ref("")

interface Message {
  textContent:String,
  messageType:String
}

function sendMessage(){
  const params = {
    textContent: userInput.value,
    sessionId: sessionId,
    type: 'USER'
  }

  chatList.push({textContent:userInput.value,messageType:"USER"},{textContent:'正在思考...',messageType:"ASSISTANT"})
  userInput.value = "";

  const eventSource = new SSE($config.baseURL + "/message/sendMessage", {
    withCredentials:true,
    start:false,
    headers : {'Content-Type':'application/json;charset=UTF-8','token':getLocalItem("token")},
    payload: JSON.stringify(params),
    method: 'POST'
  })
  let first = 0;
  eventSource.addEventListener('message', (event:any) => {
    if (first === 0){
      first = 1;
      chatList[chatList.length-1].textContent = '';
    }
    const data = event.data
    chatList[chatList.length-1].textContent = chatList[chatList.length-1].textContent + data;
  })
  eventSource.stream();
}

function scrollBottom(){
  // var div=this.$refs.scrollDiv;
  // div.scrollTop = div.scrollHeight;
}

</script>

<script lang="ts">
export default {
  name: "Chat"
}
</script>

<style scoped>

.inputBox {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  width: 100%;
  height: 60px;
}

.myInput {
  background-color:#e7e7e7;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 20px;
  height: 40px;
  font-size: 18px;
  margin-top: 3%;
}
.btnBox {
  height: 100%;
  text-align: center;
  position: relative
}
.sendBtn {
  position: absolute;
  top: 20%;
  width: 100%;
  left: 10%;
}

.chatBox {
  width: fit-content;
  max-width: 80%;
  padding: 10px 20px;
  border-radius: 15px;
  word-break:break-all;
  margin-top: 5%;
}

.assistantBox {
  background-color: #58aff6;
  color: #ffffff;
}

.rightBox {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

}
.rightBackBox {
  background-color: #efefef;
}
.leftBackBox {
  background-color: #58aff6;
  color: #ffffff;
}

</style>