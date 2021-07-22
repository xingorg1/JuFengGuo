<template>
  <a href="https://zhuanlan.zhihu.com/p/146097763">深入理解响应式API</a>
  <hr />
  <!-- <ReactiveVue /> -->
  <RefVue />
</template>

<script>
import { ref } from "vue";
import ReactiveVue from "../components/reactivityApi/ReacticeVue.vue";
import RefVue from "../components/reactivityApi/RefVue.vue";
export default {
  name: "ReactivityApi",
  components: {
    ReactiveVue,
    RefVue,
  },
  setup() {
    return {};
  },
};
</script>
