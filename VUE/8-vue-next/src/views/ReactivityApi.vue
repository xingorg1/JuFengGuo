<template>
  <a href="https://zhuanlan.zhihu.com/p/146097763">深入理解响应式API</a>
  <hr />
  <!-- <ReactiveVue /> -->
  <!-- <RefVue /> -->
  <RefDom />
</template>

<script>
import { ref } from "vue";
import ReactiveVue from "../components/reactivityApi/ReacticeVue.vue";
import RefVue from "../components/reactivityApi/RefVue.vue";
import RefDom from "../components/reactivityApi/RefDom.vue";
export default {
  name: "ReactivityApi",
  components: {
    ReactiveVue,
    RefVue,
    RefDom,
  },
  setup() {
    return {};
  },
};
</script>
