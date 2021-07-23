<template>
  <div class="wrapper">
    <div class="menu">
      <span class="logo"> 🎉 vue3.0 💗 </span>
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
      <!-- <span v-once>这个将不会改变: {{ state.msg }}
        <em>{{state.innerTxt}}</em>
      </span> -->
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import menuConfig from "./utils/menus";
export default {
  components: {},
  methods: {
    appMethod() {
      console.log(this);
    },
  },
  setup() {
    // console.log(this)
    const state = reactive({
      msg: 'v-once一次性绑定',
      innerTxt: '但请留心这会影响到该节点上的其它数据绑定'
    })
    setTimeout(() => {
      state.msg = '修改了内容也不会触发响应式更新'
      // state.innerTxt = '修改了内容也不会触发响应式更新'
      console.log(state);
    })
    return {
      menuConfig,
      state
    };
  },
};
</script>
<style scoped>
/* :root {
  --primary-color: #c33dca;
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
  background: #c33dca;
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
  color: #c33dca;
  border-right-color: #c33dca;
}
.content {
  padding: 20px;
  flex: 1;
}
</style>
