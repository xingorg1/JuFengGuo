<template>
  <div class="wrapper">
    <div class="menu">
      <span class="logo">
        ✊ 石头加油
      </span>
      <router-link
        v-for="item in menuConfig"
        :key="item.fileName"
        :to="item.path"
      >
        <!-- <axe-button :icon="item.icon" position="left"> -->
        {{ item.name }}
        <!-- </axe-button> -->
      </router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import menuConfig from "./utils/menus";
export default {
  components: {},
  setup() {
    // console.log(this)
    return {
      menuConfig,
    };
  },
};
</script>
<style scoped>
/* :root {
  --primary-color: #b83f45;
} */
.wrapper {
  display: flex;
  height: 100vh;
  background: #fff;
}
.menu {
  width: 200px;
  box-shadow: 2px 1px 6px #f1f1f5;
  font-weight: 900;
}
.menu .logo {
  display: block;
  line-height: 50px;
  font-size: 20px;
  text-align: center;
  background: #b83f45;
  color: #fff;
  border-bottom: 1px solid #fff;
}
.menu a {
  padding-left: 15px;
  display: block;
  font-size: 18px;
  line-height: 45px;
  color: #000252;
  border-right: 3px solid #fff;
}
.menu a:hover,
.menu a:active,
.menu a.router-link-active {
  color: #b83f45;
  border-right-color: #b83f45;
}
.content {
  padding: 20px;
  flex: 1;
}
</style>
