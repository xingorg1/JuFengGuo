<template>
  <h3>ref引用，获取DOM结构</h3>
  <div>
    <span ref="spanRef" @click="changeCount">
      ref的值一定要和定义的变量同名，使得同一作用域内有同名变量
    </span>
  </div>
  <axe-button @click="changeNewCount" type="primary">
    ref的响应式数据，watch的时候第一个参数不用回调函数
  </axe-button>
</template>

<script lang="ts">
import { reactive, ref, watch, toRefs } from "vue";
function reactiveData() {
  const data = reactive({
    count: 11,
  });
  return toRefs(data);
}
export default {
  name: "RefDom",
  setup(props) {
    const spanRef = ref(null);
    console.log(spanRef);

    // 通过watch修改refDom元素内部的内容
    const data = reactive({
      count: 1,
    });
    function changeCount() {
      data.count++;
    }
    watch(
      () => data.count,
      (newVal, oldVal) => {
        // data.count发生变化，执行回调函数里的内容。参数为data.count的新旧值
        console.log(newVal, oldVal);
        let spanDom = spanRef.value; // 得到dom结构
        spanDom.innerText = data.count + "=== count的值";
      }
    );

    // 测试watch的第一个参数，直接采用一个响应式数据的情况
    const newData = reactiveData(); // newData的各个property都是一个响应式数据
    console.log("newData", newData);
    function changeNewCount() {
      console.log(23);
      newData.count.value++;
    }
    watch(newData.count, (newVal, oldVal) => {
      // 第一个参数是响应式的，不用回调函数了。
      console.log(newVal, oldVal);
      let spanDom = spanRef.value; // 得到dom结构
      spanDom.setAttribute("count", newData.count.value + "新count值");
    });

    return {
      spanRef,
      changeCount,
      changeNewCount,
    };
  },
};
</script>
