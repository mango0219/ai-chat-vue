<template>
  <div>
    <div class="titleBox">
      <span class="title_pre">{{appTitle_PRE}}</span>
      <span class="title_post">{{appTitle_POST}}</span>
    </div>
    <div class="imgBox">
      <van-image
          style="box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.2)"
          round
          width="300"
          height="300"
          src="https://image0219.oss-cn-hangzhou.aliyuncs.com/images/pic33.jpg"
      />
    </div>

    <div class="btnBox">
      <van-row>
        <van-col :span="10" :offset="1">
          <van-button color="#586cf6" round class="registerBtn" @click="toRegister">Sign Up</van-button>
        </van-col>
        <van-col :span="10" :offset="2">
          <van-button color="#e7e7e7" round class="loginBtn" @click="toLogin">Sign In</van-button>
        </van-col>
      </van-row>
    </div>

    <div class="forgot">Forgot your password?</div>
  </div>
</template>

<script setup lang="ts">
import {appTitle_POST, appTitle_PRE} from "../../config";
import router from "@/router";
import {getLocalItem, removeLocalItem, setLocalItem} from "@/utils/localStore";
import {verifyTokenApi} from "@/api/user";

function toLogin(){
  router.push("/login");
}

function toRegister(){
  router.push("/register");
}


function loginByToken(){
  const token = getLocalItem("token");
  if (token!=null){
    verifyTokenApi(token).then((response)=>{
      if(response.data !== null){
        setLocalItem("user_id",response.data.id);
        setLocalItem("user_name",response.data.username);
        router.push("/home/session");
      }else {
        removeLocalItem("token");
        removeLocalItem("user_id");
        removeLocalItem("user_name");
      }
    })
  }
}
loginByToken();

</script>

<script lang="ts">
export default {
  name: "Index"
}
</script>

<style scoped>
.imgBox {
  width: 300px;
  height: 300px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
}

.title_pre {
  font-size: 30px;
  font-weight: 600;
  color: #383838;
  font-family: Monaco;
  letter-spacing: 3px;
}
.title_post {
  font-size: 30px;
  font-weight: 600;
  color: #686993;
  font-family: Monaco;
  letter-spacing: 3px;
}
.titleBox {
  margin-top: 20%;
  text-align: center;
}

.btnBox {
  margin-top: 20%;
}

.registerBtn {
  width: 100%;
  height: 50px;
  font-family: Monaco!important;
}

.loginBtn {
  width: 100%;
  height: 50px;
  color: #000000!important;
  font-family: Monaco!important;
}

.forgot {
  width: 100%;
  text-align: center;
  font-family: Monaco;
  color: #9d9ebb;
  margin-top: 10%;
}


</style>