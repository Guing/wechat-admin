<template>
  <div class="main">
    <h1>微信设置</h1>
    <div class="row">
      <div class="info">
        <i class="el-icon-chat-line-square"></i>
        <div class="des">
          <h4>机器人聊天</h4>
          <p>开启机器人聊天</p>
        </div>
        <el-button @click="aiConfigVisible = true">设置</el-button>
      </div>
      <div class="action">
        <el-switch v-if="hasAiConfig" v-model="aiStatus" active-text="开启" :close-on-click-modal="false" inactive-text="关闭"></el-switch>
      </div>
    </div>
    <el-dialog title="机器人设置" :visible.sync="aiConfigVisible">
      <el-form ref="aiForm" :model="aiConfig" :rules="aiConfigRules">
        <el-form-item label="appId：" label-width="100px" prop="appId">
          <el-input v-model="aiConfig.appId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="appKey：" label-width="100px" prop="appKey">
          <el-input v-model="aiConfig.appKey" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开启标识：" label-width="100px" prop="startKey">
          <el-input v-model="aiConfig.startKey" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="关闭标识：" label-width="100px" prop="endKey">
          <el-input v-model="aiConfig.endKey" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开启提示语：" label-width="100px">
          <el-input v-model="aiConfig.startText" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="关闭提示语：" label-width="100px">
          <el-input v-model="aiConfig.endText" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="关键词回复：" label-width="100px">
          <el-input v-model="aiConfig.msgKey" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="aiConfigVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAiConfig">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ElForm } from "element-ui/types/form";

@Component({})
export default class Home extends Vue {
  hasAiConfig: boolean = false;
  aiConfig: any = { status:0};
  aiConfigVisible: boolean = false;
  aiConfigRules = {
    appId: { required: true, message: "请输入appId", trigger: "blur" },
    appKey: { required: true, message: "请输入appKey", trigger: "blur" },
    startKey: {
      required: true,
      message: "请输入机器人开启标识",
      trigger: "blur"
    },
    endKey: { required: true, message: "请输入机器人关闭标识", trigger: "blur" }
  };
  async created() {
    let { data } = await this.$api.ai.getAi();
    this.aiConfig = data || { status:0};
    this.hasAiConfig = !!data;
  }
  get aiStatus() {
    return this.aiConfig.status === 1 ? true : false;
  }
  set aiStatus(value: boolean) {
    let status = value ? 1 : 0;
    this.aiConfig.status = status;
    this.updateAi({ status });
  }
  async updateAi(poyload: object) {
    let { data } = await this.$api.ai.updateAi(poyload);
    this.$message({
      message: data ? "设置成功" : "设置失败",
      type: data ? "success" : "error"
    });
      this.$api.wechat.startAi();
  }
  async saveAiConfig() {
    (this.$refs.aiForm as ElForm).validate(async valid => {
      if (!valid) {
        return false;
      }
      if (this.hasAiConfig) {
        await this.updateAi(this.aiConfig);
      } else {
        let { data } = await this.$api.ai.setAi(this.aiConfig);
        this.$message({
          message: data ? "设置成功" : "设置失败",
          type: data ? "success" : "error"
        });
        this.hasAiConfig = true;
          this.$api.wechat.startAi();
      }
    
      this.aiConfigVisible = false;
    });
  }
}
</script>
<style lang="scss" scoped>
.row {
  width: 80%;
  padding: 20px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .info {
    display: flex;
    align-items: center;
    i {
      font-size: 40px;
      display: block;
      margin-right: 20px;
    }
    .des {
      text-align: left;
      margin-right: 20px;
      p {
        font-size: 12px;
        margin-top: 5px;
        color: #666;
      }
    }
  }
}
</style>

