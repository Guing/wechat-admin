<template>
  <div class="box" v-loading="loading" element-loading-text="加载二维码">
    <el-button
      class="btn-refresh"
      v-if="isExpire"
      @click="getCode"
      type="primary"
      icon="el-icon-refresh"
    ></el-button>
    <div class="code" :class="{expire:isExpire}"   >
          <img  :src="codeUrl"  />
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

@Component({})
export default class WeChatLogin extends Vue {

  @Prop({
    type: Boolean
  })
  show!: boolean;
   expireTime:number = 60*1000;
  codeUrl: string = "";

  loading: boolean = false;
  isExpire: boolean = false;

  @Watch("show", { immediate: true, deep: true })
  async onShowChanged(val: string, oldVal: string) {
    console.log(val);
    if (val) {
      await this.isLogin(false).catch(()=>{
         this.isExpire = true;
      });
      this.getCode();
    }
  }
  @Watch("codeUrl", { immediate: true, deep: true })
  onCodeUrlChanged(val: string, oldVal: string) {
    if (val != "") {
      this.isLogin();
    }
  }
  async getCode() {
    this.loading = true;
    const result = await this.$api.wechat.getCode();
    this.codeUrl = result.data;
    setTimeout(() => {
      this.isExpire = true;
    }, this.expireTime);
    this.loading = false;
     this.isExpire = false;
  }
  async isLogin(isRepeat: boolean = true) {
    const result = await this.$api.wechat.isLogin();
    if (!result.data) {
      isRepeat &&
        setTimeout(async () => {
          this.isLogin();
        }, 2000);
    } else {
      this.$router.push("/");
    }
  }
}
</script>

<style scoped lang="scss">
.box {
  position: relative;
}
.btn-refresh {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.code {
  position: relative;
  display: block;
  margin: 0 auto;
  width:200px;
  height:200px;
  img{
    width:100%;
    height: 100%;
  }
  &.expire::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
  }
}
</style>
