<template>
  <div class="box">
    <el-form :inline="true" ref="tableFilter" :model="myData" class="table-filter">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item,index) in myConfig" :key="index">
          <el-form-item :prop="item.name" :label="item.label">
            <el-input
              v-if="item.domType === 'input'"
              :type="item.type"
              v-model.trim="myData[item.name]"
              :placeholder="item.placeholder"
            />
            <el-select
              v-if="item.domType === 'select'"
              v-model="myData[item.name]"
              :placeholder="item.placeholder"
            >
              <template v-if="item.options && item.options.length > 0">
                <el-option
                  v-for="option in item.options"
                  :value="option.value"
                  :key="option.value"
                  :label="option.label"
                ></el-option>
              </template>
            </el-select>
            <el-time-select
              v-if="item.domType === 'time'"
              v-model="myData[item.name]"
              :placeholder="item.placeholder"
            />
            <el-date-picker
              v-if="item.domType === 'date' || item.domType === 'datetime'  "
              v-model="myData[item.name]"
              :type="item.domType"
              :placeholder="item.placeholder"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="btn-box">
        <el-button type="primary" @click="getData">搜索</el-button>
        <el-button type="primary" @click="resetData">重置</el-button>
        <el-button type="primary" @click="exportData">导出</el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue, Emit } from "vue-property-decorator";
import {Form as ElForm} from 'element-ui'
@Component({})
export default class TableFilter extends Vue {
  @Prop({
    required: true
  })
  private data!: object; //搜索条件
  @Prop({
    required: true
  })
  private config!: TableFilterConfig[]; //配置dom

  @Prop({
    default: 4
  })
  private showNum!: number; //最大显示数

  myConfig = this.config.map(item => {
    !item.domType && (item.domType = "input");
    !item.type && (item.type = "text");
    !item.placeholder &&
      (item.placeholder = `${
        item.domType === "input" ? "请输入" : "请选择"
      }${item.label || ""}`);
    item.label = item.label ? `${item.label}：` : "";
    return item;
  });

  get myData() {
    return this.data;
  }
  set myData(val) {
    this.$emit("data:update", val);
  }

  @Emit()
  getData() {
    this.$emit("getData");
  }
  resetData() {
    (this.$refs.tableFilter as ElForm).resetFields();
    this.getData();
  }
  async exportData() {
    let result = await this.$api.wechat.exportFriends(this.data);
    let url = window.URL.createObjectURL(new Blob([result]));
    let link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.setAttribute("download", "好友数据.xlsx");
    document.body.appendChild(link);
    link.click();
    this.$message.success({
      message: "导出成功"
    });
  }
}
</script>

<style scoped lang="scss">
.box {
  margin-bottom: 20px;
  .btn-box {
    display: flex;
    justify-content: flex-start;
  }
}
</style>
