<template>
  <!-- 新特性学习 -->
  <div class="api-demo">
    <!-- ref -->
    <p ref="refDom" @click="changeCount">
      我是ref元素。点我看效果
    </p>

    <!-- teleport -->
    <axe-button @click="openModal">点我打开 teleport组件 生成的弹窗</axe-button>
    <teleport to="#app" v-if="data.showModal">
      <span class="api-modal"> 我是弹窗-toApp </span>
    </teleport>
    <teleport to="body">
      <span class="vue3-modal" v-if="data.showModalBody">
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
.api-demo p{
  margin-bottom: 10px;
}
.api-modal {
  padding: 20px;
  border: 1px solid #7b2227;
  background: #c33dca;
  color: #fff;
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
<style>
.vue3-modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: -50px;
  padding: 10px;
  border: 1px solid #c5c500;
  background: yellow;
}
</style>

