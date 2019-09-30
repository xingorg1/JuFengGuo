<template lang="pug">
  .header
    el-row.header-box
      el-col(:span="12")
        my-geo
      my-nav
    el-row.header-bar
      .header-box.clearfix
        el-col(:span="6")
          LogoBar
        el-col(:span="11")
          SearchBar(:hotSearch="listData")
          ul.header-list
            li(v-for="item in listData") 
              a(href="#") {{item}}
    //- .header-content logo+搜索框

    
</template>

<script>
import MyNav from "@/components/header/nav.vue";
import MyGeo from "@/components/header/geo.vue";
import LogoBar from '@/components/header/logoBar.vue'
import SearchBar from '@/components/header/searchBar.vue'
export default {
  name: "MyHeader",
  components: {
    MyNav,
    MyGeo,
    LogoBar,
    SearchBar
  },
  data() {
    return {
      listData: ["水立方嬉水乐园", "故宫博物院", "故宫", "北京欢乐谷", "八达岭长城", "北京动物园", "欢乐水魔方水上乐园"]
    };
  }
};
</script>

<style lang="scss">
@import '@/assets/css/header/index.scss'
</style>
