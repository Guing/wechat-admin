<template>
  <div class="main">
    <!-- <div class="search">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model="search.name" placeholder="名字"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="search.alias" placeholder="别名"></el-input>
        </el-col>
        <el-col :span="6">
          <el-select v-model="search.friend" placeholder="是否朋友">
            <el-option label="全部朋友" value></el-option>
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="2"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="search.gender" placeholder="性别">
            <el-option label="全部性别" value></el-option>
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="2"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="search.type" placeholder="类型">
            <el-option label="全部类型" value></el-option>
            <el-option label="个人" :value="1"></el-option>
            <el-option label="公众号" :value="2"></el-option>
            <el-option label="未知" :value="3"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input v-model="search.province" placeholder="省份"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="search.city" placeholder="城市"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-button type="primary" @click="getData">搜索</el-button>
        </el-col>
      </el-row>
    </div>-->
    <TableFilter :data.sync="search" :config="searchConfig" @getData="getData"></TableFilter>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="名字" width="100px">
        <template slot-scope="scope">
          <span v-html=" scope.row.name "></span>
        </template>
      </el-table-column>
      <el-table-column prop="别名" label="别名" width="100px">
        <template slot-scope="scope">
          <span v-html=" scope.row.alias "></span>
        </template>
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="100px"></el-table-column>
      <el-table-column prop="star" label="星标" width="100px"></el-table-column>
      <el-table-column prop="朋友" label="朋友" width="100px"></el-table-column>
      <el-table-column prop="friend" label="城市" width="100px"></el-table-column>
      <el-table-column prop="province" label="省份" width="100px"></el-table-column>
      <el-table-column prop="type" label="类型" width="100px"></el-table-column>
      <el-table-column prop="signature" label="描述"></el-table-column>
    </el-table>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TableFilter from "../components/TableFilter.vue";
@Component({
  components: {
    TableFilter
  }
})
export default class Friends extends Vue {
  tableData: object[] = [];
  searchConfig = [
    {
      name: "name",
      label: "名字"
    },
    {
      domType: "select",
      name: "gender",
      label: "性别",
      options: [{ label: "男", value: 1 }, { label: "女", value: 2 }]
    }
  ];
  search: object = {
    name: "",
    alias: "",
    friend: "",
    type: "",
    gender: "",
    province: "",
    city: ""
  };
  created() {
    this.getData();
  }
  async getData() {
    let result = await this.$api.wechat.getFriends(this.search);
    this.tableData = result.data;
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

