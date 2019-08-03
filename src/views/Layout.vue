<template>
  <el-container class="wrap">
    <el-aside :width="isCollapse?'64px':'125px'">
      <el-menu
        :default-active="$route.path"
        unique-opened
        router
        class="menu"
        background-color="#545c64"
        text-color="#fff"
        :collapse-transition="false"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
      >
        <el-menu-item v-for="(item, index) in menuList.children" :key="index" :index="item.path">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{item.meta.title}}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div class="tools" @click.prevent="isCollapse = !isCollapse">
          <i class="el-icon-s-fold"></i>
        </div>
        <div class="userinfo">
          <el-dropdown trigger="hover">
            <span class="el-dropdown-lick userinfo-inner">
              <img :src="avatar" />
              {{ userInfo.realname?userInfo.realname:userInfo.username }}
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item>我的消息</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>-->
              <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Home extends Vue {
  isCollapse: boolean = false;
  get menuList() {
    return (this.$router as any).options.routes.filter(
      (item: any) => item.name === "layout"
    )[0];
  }
  get userInfo() {
    return this.$store.state.userInfo;
  }
  get avatar() {
    return this.userInfo.avatar
      ? this.userInfo.avatar
      : require("@/assets/images/user.png");
  }
  created() {
    this.$store.dispatch("getUserInfo");
  }
  async logout() {
    await this.$api.user.loginOut();
    this.$store.dispatch("logOut");
    this.$router.push("/login");
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
}
.menu {
  height: 100%;
  text-align: left;
}
.header {
  height: 60px;
  line-height: 60px;
  background: #545c64;
  color: #fff;
  display: flex;
  justify-content: space-between;
  .tools {
    font-size: 20px;
    cursor: pointer;
  }
  .userinfo {
    text-align: right;
    float: right;
    .userinfo-inner {
      cursor: pointer;
      color: #fff;
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin: 10px 0px 10px 10px;
        float: right;
      }
    }
  }
}
</style>

