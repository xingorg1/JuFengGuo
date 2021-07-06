<template>
  <axe-button
    icon="axe-icon-love"
    type="danger"
    style="float: right"
    position="left"
    >Axe使用成功啦！喜大普奔～</axe-button
  >
  <api></api>
  <router-link to="/">
    <axe-button icon="axe-icon-love" position="left">Home</axe-button>
  </router-link>
  <router-link to="/todoList">
    <axe-button position="left">TodoList</axe-button>
  </router-link>
  <router-view></router-view>
</template>

<script>
import Api from './components/Api.vue'

export default {
  components: {
    Api
  },
  setup() {
    // console.log(this)
  },
};
</script>
