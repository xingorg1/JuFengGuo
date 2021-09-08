<template>
  <div v-show="type === 1">
    <axe-button type="danger" @click="updateMV">
      v-model简单用法。这样一个组件只能写一个，传递到子组件内部的属性名字默认固定是modelValue
    </axe-button>
    <span> modelValue：{{ modelValue }} </span>
  </div>
  <br />
  <div v-show="type === 2">
    <axe-button type="danger" @click="updateMV2">
      v-model参数（改变传递属性的名字）这样就可以写多个v-model了
    </axe-button>
    <span> myCount2：{{ myCount2 }}、myCount3：{{ myCount3 }} </span>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
export default {
  emits: ['update:modelValue', 'update:myCount2'],
  props: {
    type: Number,
    modelValue: Number,
    myCount2: Number,
    myCount3: Object,
  },
  setup() {
    const newCount = reactive({
      count: 1,
    });

    return {
      newCount,
    };
  },
  methods: {
    updateMV() {
      this.newCount.count++;
      // this.$emit("update:modelValue", this.newCount.count);
      this.$emit("update:modelValue", this.modelValue + 1);
    },
    updateMV2() {
      this.$emit("update:myCount2", this.myCount2 + 1);

      // 通过传递一个响应式对象，可以在子组件直接修改数据。不用再绑定“update:xx”格式的自定义事件了
      this.myCount3.count += 2;

      console.log(this.myCount2, this.myCount3);
    },
  },
};
</script>

<style>
</style>