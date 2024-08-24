<template>

  <div style="width: 100%">
    <van-nav-bar
        title="Get Started"
        left-text="返回"
        left-arrow
        @click-left="back"
        style="width: 100%"
    />

    <van-form @submit="register" @failed="valFail" validate-trigger="onChange" :show-error-message="false" :show-error="true">
      <div class="lineBox">
        <span class="title">Username</span>
        <van-field name="username" clearable :rules="[{ required: true, message: '请填写用户名' }]" :center="true" maxlength="32"  class="in" v-model="user.username" placeholder="请输入用户名" />
      </div>

      <div class="lineBox">
        <span class="title">Password</span>
        <van-field name="password" clearable :center="true"  :rules="[{ required: true, message: '请填写密码' }]" type="password" maxlength="15"  class="in" v-model="user.password" placeholder="请输入密码" />
      </div>

      <div class="lineBox">
        <span class="title">Confirm Password</span>
        <van-field name="confirmPassword" clearable :center="true" type="password" :rules="[{required: true, validator, message: '两次密码填写不一致' }]"  maxlength="15"  class="in" v-model="confirmPassword" placeholder="请再次输入密码" />
      </div>

      <div class="lineBox">
        <span class="title">Phone</span>
        <van-field name="phone" clearable :center="true" type="tel" :rules="[{ required: true, message: '请填写手机号' }]" maxlength="15"  class="in" v-model="user.phone" placeholder="请输入手机号" />
      </div>

      <div class="lineBox">
        <span class="title">Email</span>
        <van-field name="email" clearable :center="true" type="email" :rules="[{ required: true, message: '请填写邮箱' }]" maxlength="100"  class="in" v-model="user.email" placeholder="请输入邮箱" />
      </div>

      <div class="acceptBox">
        <van-checkbox v-model="checked" shape="square" class="accept">
          By signing up. You accept our <a href="#" ref="a">terms of service</a> and <a href="#">privacy policy</a>.
        </van-checkbox>
      </div>

      <div class="btnBox">
        <van-row>
          <van-col :span="18" :offset="3">
            <van-button type="primary"  round class="signBtn" native-type="submit" >Sign Up</van-button>
          </van-col>
        </van-row>
      </div>
    </van-form>

  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import {registerApi} from "@/api/user";
import router from "@/router";

function back() {
  history.back();
}

let user = reactive({
  username: '',
  password: '',
  email: '',
  phone: ''
});
let confirmPassword = ref('');
let checked = ref(false)

const validator = (val:any) => val===user.password;

const valFail = (errorInfo:any) => {
  showFailToast(errorInfo.errors[0].message)
}

function register(values:any) {
  if (!checked.value){
    showFailToast("请勾选隐私协议");
    return;
  }

  registerApi(user).then((res:any)=> {
    if (res.code === 200) {
      // 注册成功
      const username = user.username;
      const password = user.password;
      showSuccessToast('注册成功');
      setTimeout(()=>{
        router.push('/login');
      },2000);
    }else {
      // 注册失败
      showFailToast(res.msg);
    }
  })

}


</script>

<script lang="ts">
export default {
  name: "Register"
}
</script>

<style scoped>

  .lineBox {
    height: 100px;
    width: 100%;
    margin-top:6%;
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

  .acceptBox {
    margin-top: 5%;
  }

  .accept {
    font-family: Monaco;
  }

  .btnBox {
    margin-top: 5%;
  }

  .signBtn {
    background-color: #586cf6;
    width: 100%;
    height: 200%;
  }


</style>