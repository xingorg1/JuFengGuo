<template lang="pug">
  //- 顶部左侧 - 地理位置
  el-row.geo
    //- 左边
    el-col(:span='13').geo-left
      //- span.site #[i.el-icon-location]北京
      el-link.geo-site(type='info' icon="el-icon-location") 北京
      el-link.change-city(type='info') 切换城市
      span.geo-link [#[el-link(type='info')  门头沟区] #[el-link(type='info')  大厂回族自治县]#[el-link(type='info')  廊坊] ]
    //- 右边，是否登录状态
    el-col(:span='8').geo-right
      el-link(type='primary') 立即登录
      el-link(type='info') 注册
</template>

<script>
export default {
  name: "Geo",
  data() {
    return {};
  }
};
</script>

<style lang="scss">
  @import '@/assets/css/header/geo.scss';
</style>
