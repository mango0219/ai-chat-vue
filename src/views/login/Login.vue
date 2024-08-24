<template>
  <div>
    <van-nav-bar
        title="Login"
        left-text="返回"
        left-arrow
        @click-left="back"
    />

    <van-form style="margin-top: 20%" @submit="login" @failed="valFail" validate-trigger="onChange" :show-error-message="false" :show-error="true">
      <div class="lineBox">
        <span class="title">Username</span>
        <van-field name="username" clearable :rules="[{ required: true, message: '请填写用户名' }]" :center="true" maxlength="32"  class="in" v-model="user.username" placeholder="请输入用户名" />
      </div>

      <div class="lineBox">
        <span class="title">Password</span>
        <van-field name="password" clearable :center="true"  :rules="[{ required: true, message: '请填写密码' }]" type="password" maxlength="15"  class="in" v-model="user.password" placeholder="请输入密码" />
      </div>

      <div class="rememberBox">
        <van-checkbox v-model="checked" shape="square" class="accept">
          Remember Password.
        </van-checkbox>
      </div>

      <div class="btnBox">
        <van-row>
          <van-col :span="18" :offset="3">
            <van-button type="primary"  round class="signBtn" native-type="submit" >Sign In</van-button>
          </van-col>
        </van-row>
      </div>
    </van-form>

    <div class="toRegister ">
      <span>Don't have an account yet? Go to Register.</span>
      <span class="myLink" @click="toRegister">Go to Register.</span>
    </div>
  </div>
</template>

<script setup lang="ts">

import {showFailToast} from "vant";
import router from "@/router";
import {onMounted, reactive, ref} from "vue";
import {
  getCookieItem,
  getLocalItem,
  removeCookieItem,
  removeLocalItem,
  setCookieItem,
  setLocalItem
} from "@/utils/localStore";
import {loginApi, verifyTokenApi} from "@/api/user";
import { useRoute } from 'vue-router'

interface User {
  username: string;
  password: string;
}

let user:User = reactive({
  username: '',
  password: ''
})

const username = getCookieItem("login:username");
const password = getCookieItem("login:password");
if (username !== null && password !== null){
  user.username=username;
  user.password=password;
}

let checked = ref(false);
const c_check = getCookieItem("login:remember");
if (c_check !== null) {
  if (c_check === "0") {
    checked.value = false;
  }else {
    checked.value = true;
  }
}

function back() {
  history.back();
}

function toRegister(){
  router.push("/register")
}

const valFail = (errorInfo:any) => {
  showFailToast(errorInfo.errors[0].message)
}

function loginByToken(){
  const token = getLocalItem("token");
  if (token!=null){
    verifyTokenApi(token).then((response)=>{
      console.log(response);
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

async function login(){
  if(checked.value){
    setCookieItem("login:remember",'1');
  }else{
    setCookieItem("login:remember",'0');
  }

  loginApi(user).then((response:any)=>{
    if (response.code===200){
      // 登陆成功
      if (checked.value){
        setCookieItem("login:username",user.username);
        setCookieItem("login:password",user.password);
      }else{
        removeCookieItem("login:username");
        removeCookieItem("login:password");
      }
      setLocalItem("user_id",response.data.id);
      setLocalItem("user_name",response.data.username);
      setLocalItem("token",response.data.token);
      router.push('/home/session');

    }else {
      // 登陆失败
      showFailToast(response.msg);
      removeCookieItem("login:username");
      removeCookieItem("login:password");
      removeCookieItem("login:remember");
    }
  })
}

</script>

<script lang="ts">
export default {
  name: "Login"
}
</script>

<style scoped>
.lineBox {
  height: 100px;
  width: 100%;
  margin-top:10%;
}

.title {
  font-weight: 600;
  font-family: Monaco,serif;
  font-size: 18px;
}

.in {
  background-color:#e7e7e7;
  border-radius: 20px;
  padding: 15px;
  height: 60px;
  font-size: 18px;
  margin-top: 3%;
}

.btnBox {
  margin-top: 5%;
}

.signBtn {
  background-color: #586cf6;
  width: 100%;
  height: 200%;
}

.toRegister {
  width: 100%;
  margin-top: 15%;
  text-align: center;
}
.myLink {
  color: #586cf6;
  font-family: Monaco;
}

.rememberBox {
  margin-top: 5%;
}

.accept {
  font-family: Monaco;
}
</style>