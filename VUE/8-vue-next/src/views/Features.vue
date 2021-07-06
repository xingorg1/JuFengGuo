<template>
  <!-- 新特性学习 -->
  <div class="api-demo">
    <!-- ref -->
    <p ref="refDom" style="text-align: right" @click="changeCount">
      我是ref元素。点我看效果
    </p>

    <!-- teleport -->
    <axe-button @click="openModal">点我打开弹窗</axe-button>
    <teleport to="#app" v-if="data.showModal">
      <span style="padding: 20px; border: 1px solid; background: red">
        我是弹窗-toApp
      </span>
    </teleport>
    <teleport to="body">
      <span
        style="padding: 20px; border: 1px solid; background: yellow"
        v-if="data.showModalBody"
      >
        我是弹窗-toBody。v-if也可以放到内部元素而非teleport组件上
      </span>
    </teleport>
  </div>
</template>

<script>
import { reactive, ref, watch } from "vue";
export default {
  setup() {
    // console.log(this)
    const refDom = ref(null);
    console.log(refDom);
    const data = reactive({
      count: 1,
      showModal: false,
      showModalBody: false,
    });
    function changeCount() {
      data.count++;
    }
    watch(
      () => data.count,
      (newVal, oldVal) => {
        console.log(newVal, oldVal);
        let p = refDom.value;
        console.log(p);
        p.innerText = `现在data.count的值从${oldVal}变成${newVal}`;
      }
    );

    function openModal() {
      data.showModal = !data.showModal;
      data.showModalBody = !data.showModalBody;
    }
    return {
      refDom,
      changeCount,
      data,
      openModal,
    };
  },
};
</script>
<style scoped>
.api-demo {
  clear: both;
  margin-top: 50px;
}
</style>

