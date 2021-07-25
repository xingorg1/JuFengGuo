<template>
  <!-- 新特性学习 -->
  <div class="api-demo">
    <!-- ref -->
    <p ref="refDom" @click="changeCount">我是ref元素。点我看效果</p>

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

  <div class="area">
    <Emittes @click="handleClick" @submit="submitClick" />
  </div>

  <div class="area">
    <h3>v-model</h3>
    <Vmodel
      :type="1"
      v-model="model1.count"
      @update:modelValue="updateModelVal"
    />
    <h3>v-model参数、多个v-model</h3>
    <Vmodel
      :type="2"
      v-model:myCount2="model2.count"
      v-model:myCount3="model3"
    />
  </div>
</template>

<script>
import { reactive, ref, watch } from "vue";
import Emittes from "../components/features/Emits.vue";
import Vmodel from "../components/features/Vmodel.vue";
export default {
  components: {
    Emittes,
    Vmodel,
  },
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

    function handleClick() {
      console.log("自定义事件");
    }

    function submitClick({ email, psd }) {
      console.log(email, psd);
    }

    // v-model
    const model1 = reactive({
      count: 1,
    });
    function updateModelVal() {
      console.log("updateModelVal函数签名：", ...arguments);
      console.log("父组件的响应式数据被改变了：", model1.count);
    }

    // v-model参数使用、多个v-model
    const model2 = reactive({
      count: 1,
    });
    // function updateModelVal2() {
    //   // 父组件不定义这个函数也可以，因为值已经在子组件发射的时候变了，而不是在父组件的这个自定义事件中变得。
    //   console.log("updateModelVal2-父组件的响应式数据被改变了：", model2.count);
    // }

    const model3 = reactive({
      count: 1,
    });
    return {
      refDom,
      changeCount,
      data,
      openModal,
      handleClick,
      submitClick,
      model1,
      updateModelVal,
      model2,
      // updateModelVal2,
      model3,
    };
  },
};
</script>
<style scoped>
.api-demo p {
  margin-bottom: 10px;
}
.api-modal {
  padding: 20px;
  border: 1px solid #215b92;
  background: #3d87ca;
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
.axe-button {
  margin-bottom: 10px;
  margin-right: 10px;
}
</style>

