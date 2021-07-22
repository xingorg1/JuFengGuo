<template>
  <h3>ref：接受一个内部值，这个内部值怎么理解？</h3>
  <div class="area">
    {{count}}
    <br>
    <p>如果将对象分配为 ref 值，则通过 reactive 方法使该对象具有高度的响应式。</p>
    {{obj.count}}
  </div>
</template>

<script lang="ts">
import { reactive, ref, unref } from "vue";
export default {
  name: "RefVue",
  setup() {
    const count = ref(0);
    console.log(count); // RefImpl {_rawValue: 0, _shallow: false, __v_isRef: true, _value: 0}
    console.log(count.value); // 0

    count.value++;
    console.log(count.value); // 1

    const obj = ref({
      count: 0,
    });
    console.log(obj); // RefImpl {_rawValue: {…}, _shallow: false, __v_isRef: true, _value: Proxy}
    console.log(obj.value.count ++ )


    const foo = ref<string | number>(0) // foo 的类型：Ref<string | number>
    // foo.value = false 类型报错
    if(typeof foo.value === 'number') foo.value++

    // unref
    const unwrapped = unref(foo) // unwrapped 现在一定是数字类型
    console.log(foo, unwrapped)
    console.log(unref(obj)) // 类似返回了ref.value值。如果不是ref，直接返回原值
    const rec = reactive({
      name: 'reactive'
    })
    console.log(unref(rec))
    return {
      count,
      obj
    };
  },
};
</script>
