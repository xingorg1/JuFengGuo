<template lang="pug">
  .logo-bar
    router-link(to="/")
      img(src="http://s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png")
</template>

<script>
export default {
  name: "LogoBar",
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.logo-bar{
    float: left;
    padding-top: 28px;
    padding-right: 60px;
    padding-bottom: 40px;
    font-size: 16px;
    min-width: 220px;
    height: 54px;
    box-sizing: content-box;
  img{
    width: 126px;
    height: 46px;
    border: 0;
    vertical-align: initial;
  }
}
</style>
