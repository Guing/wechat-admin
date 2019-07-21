<template>
  <div class="wrap">
    <section class="form">
      <h1>登录</h1>
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入帐户"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请你输入密码"></el-input>
        </el-form-item>
        <div class="btn-box">
          <el-button type="primary" @click="login">登录</el-button>
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
  loginForm = {
    username: "",
    password: ""
  };
  rules = {
    username: [{ required: true, message: "请输入帐户", trigger: "blur" }],
    password: [{ required: true, message: "请你输入密码", trigger: "blur" }]
  };
  login() {
    (this.$refs["loginForm"] as any).validate(async (valid: boolean) => {
      if (valid) {
        const {data} = await this.$api.user.login({
          username: this.loginForm.username,
          password: this.loginForm.password
        });
         this.$store.commit('SET_TOKEN',data.token);
         this.$router.push('/');
      }
    });
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
