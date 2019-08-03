<template>
  <div class="main">
    <TableFilter :data.sync="search" :showExport="false" :config="searchConfig" @getData="getData"></TableFilter>
    <el-table :data="tableData" border style="width: 100%" >
      <el-table-column label="名字" >
        <template slot-scope="scope">
          <span v-html=" scope.row.payload.topic "></span>
        </template>
      </el-table-column>
      <el-table-column  label="人数" >
        <template slot-scope="scope">
          <span v-html=" scope.row.payload.memberIdList.length "></span>
        </template>
      </el-table-column>
     <el-table-column  label="操作" >
        <template slot-scope="scope">
             <el-button @click="viewMember(scope.row.payload.topic)" >查看群员 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TableFilter from "../components/TableFilter.vue";
import TablePaging from "../components/TablePaging.vue";
@Component({
  components: {
    TableFilter,
    TablePaging
  }
})
export default class Friends extends Vue {
  tableData: object[] = [];
  searchConfig = [
    {
      name: "topic",
      label: "名字"
    }
  ];
  search = {
    topic: "",
    
  };
  created() {
    this.getData();
  }
  async getData() {
    let result = await this.$api.wechat.getRooms(this.search);
    this.tableData = result.data
  }
  viewMember(topic:string){
      
  }

}
</script>
<style lang="scss" scoped>
.search {
  .el-col {
    margin-bottom: 20px;
  }
  .el-select {
    width: 100%;
  }
}
</style>

