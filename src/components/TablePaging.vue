<template>
  <div class="box">
    <el-pagination
      background
      :page-sizes="pageSizes"
      :page-size.sync="myData.pageSize"
      :current-page.sync="myData.pageIndex"
      :total="myData.pageCount"
      layout="sizes, prev, pager, next, jumper, ->, total, slot"
      @current-change="handleCurrentChange"
      @size-change="handleSizesChange"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue, Emit } from "vue-property-decorator";
@Component({})
export default class TablePaging extends Vue {
  @Prop({
    required: true
  })
  private data!: any; //搜索条件
  pageSizes: number[] = [10, 20, 30, 40, 50, 100];
  get myData() {
    return this.data;
  }
  set myData(val) {
    this.$emit("data:update", val);
  }
  @Emit()
  handleCurrentChange(pageIndex: number) {
    this.myData.pageIndex = pageIndex;
    this.$emit("getData");
  }
  @Emit()
  handleSizesChange() {
    this.myData.pageIndex = 1;
    this.$emit("getData");
  }
}
</script>

<style scoped lang="scss">
.box {
  margin-top: 20px;
}
</style>
