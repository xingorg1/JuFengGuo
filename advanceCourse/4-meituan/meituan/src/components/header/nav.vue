<template lang="pug">
  .my-nav
    ul.clearfix
      li.col
        el-link(type="info" href="#" target="_blank") 我的美团
        navList01(:navlistData="navaListData.myMT")
      li.col.app-col
        el-link(type="info") 手机APP
      li.col
        el-link(type="info") 商家中心
        navList01.business-modal(:navlistData="navaListData.businessData")
      li.col
        el-link(type="info") 美团规则
        navList01(:navlistData="navaListData.ruleMT")
      li.col
        el-link(type="info") 网站导航
        .navList.nav-modal
          navList02.column03(:navlistData="navaListData.travalData")
          navList02.column02(:navlistData="navaListData.eatData")
          navList02(:navlistData="navaListData.movieData")
          navList03(:navlistData="navaListData.appData")
</template>

<script>
const {log} = console;
import navList01 from "@/components/header/navList01.vue";
import navList02 from "@/components/header/navList02.vue";
import navList03 from '@/components/header/navList03.vue';
import listData from '@/assets/data/navList.json';
export default {
  name: "MyNav",
  components: {
    navList01,
    navList02,
    navList03
  },
  data() {
    return {
      navaListData: listData
    };
  },
  computed:{
  },
  created(){
    log(this.navaListData,this.navaListData.appData)
  },
  mounted(){
  }
};
</script>

<style lang="scss">
@import '@/assets/css/header/nav.scss';
</style>
