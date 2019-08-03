<template>
  <div>
    <h1>微信好友性别比例</h1>
    <ve-ring :data="sexData"></ve-ring>
    <h1>微信好友地区分布</h1>
    <ve-pie :data="areaData"></ve-pie>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Home extends Vue {
  sexData = {
    columns: ["性别", "数量"],
    rows: [{ 性别: "男", 数量: 0 }, { 性别: "女", 数量: 0 }]
  };
  areaData = {
    columns: ["地区", "数量"],
    rows: [{ 地区: "", 数量: 0 }]
  };
  async created() {
    let { data } = await this.$api.wechat.chart();
    this.sexData.rows = [
      { 性别: "男", 数量: data.sexData["男"] },
      { 性别: "女", 数量: data.sexData["女"] }
    ];
    for( let key in data.provinceData ){
        if(key){
           this.areaData.rows.push({ '地区':key,'数量': data.provinceData[key] });
        }
    }
  }
}
</script>
