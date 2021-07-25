<template>
  <h3>
    深入理解响应式API
    <a href="https://zhuanlan.zhihu.com/p/146097763">更多</a>
  </h3>
  <!-- <ReactiveVue /> -->
  <!-- <RefVue /> -->
  <div class="area">
    <RefDom />
  </div>
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
