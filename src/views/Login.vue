<template>
  <div class="wrap">
    <section class="form">
      <h1>登录</h1>
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item>
          <el-input v-model="loginForm.userName" placeholder="请输入帐户"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginForm.passWord" placeholder="请你输入密码"></el-input>
        </el-form-item>
        <div class="btn-box">
          <el-button type="primary" @click="login" >登录</el-button>
          <el-button>注册</el-button>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Login extends Vue {
  loginForm: object = {
    userName: "",
    passWord: ""
  };
  rules: object = {
    userName: [{ required: true, message: "请输入帐户", trigger: "blur" }],
    passWord: [{ required: true, message: "请你输入密码", trigger: "blur" }]
  };
   async login(){
       await this.$refs['loginForm'].validate();
       
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  height: 100%;
  background: #ddd;
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form {
  width: 400px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  padding: 20px;
  text-align: center;
}
h1 {
  margin-bottom: 10px;
}
</style>
