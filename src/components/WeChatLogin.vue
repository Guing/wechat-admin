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
    if (val) {
       let  data  =  await this.checkLogin(false);
       if(!data){
         await this.$api.wechat.start().catch(()=>{});
         this.getCode();
       }
       
    }
  }
  @Watch("codeUrl", { immediate: true, deep: true })
  onCodeUrlChanged(val: string, oldVal: string) {
    if (val != "") {
      this.checkLogin();
    }
  }
  async getCode() {
    this.loading = true;
    const { data } = await this.$api.wechat.getCode();
    if( data === true ){
       return this.$router.push('/');
    }else if( data === "" ){
       setTimeout(()=>{
          this.getCode()
       },1000);
       return;
    }
    this.codeUrl = data;
    this.loading = false;
    this.isExpire = false;
     setTimeout(() => {
      this.isExpire = true;
    }, this.expireTime);
  }
  async checkLogin(isRepeat: boolean = true) {
    const { data } = await this.$api.wechat.checkLogin();
    if (!data) {
      isRepeat &&
        setTimeout(async () => {
          this.checkLogin();
        }, 2000);
    } else {
      this.$router.push("/");
    }
    return data;
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
