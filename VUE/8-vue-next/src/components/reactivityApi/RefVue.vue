<template>
  <h3>ref：接受一个内部值，这个内部值怎么理解？</h3>
  <div class="area">
    <!-- {{ count }} -->
    <br />
    <p>
      如果将对象分配为 ref 值，则通过 reactive 方法使该对象具有高度的响应式。
    </p>
    <!-- {{ obj.count }} -->
    <input v-model="text" />
  </div>
</template>

<script lang="ts">
import {
  customRef,
  isReactive,
  reactive,
  ref,
  shallowRef,
  toRef,
  unref,
  isRef,
  watchEffect,
  triggerRef
} from "vue";
export default {
  name: "RefVue",
  setup(props) {
    // const count = ref(0);
    // console.log(count); // RefImpl {_rawValue: 0, _shallow: false, __v_isRef: true, _value: 0}
    // console.log(count.value); // 0

    // count.value++;
    // console.log(count.value); // 1

    // const obj = ref({
    //   count: 0,
    // });
    // console.log(obj); // RefImpl {_rawValue: {…}, _shallow: false, __v_isRef: true, _value: Proxy}
    // console.log(obj.value.count++);

    // const foo = ref<string | number>(0); // foo 的类型：Ref<string | number>
    // // foo.value = false 类型报错
    // if (typeof foo.value === "number") foo.value++;

    // // unref
    // const unwrapped = unref(foo); // unwrapped 现在一定是数字类型
    // console.log(foo, unwrapped);
    // console.log(unref(obj)); // 类似返回了ref.value值。如果不是ref，直接返回原值
    // const rec = reactive({
    //   name: "reactive",
    // });
    // console.log(unref(rec));

    // // toRef
    // const state = reactive({
    //   foo: 1,
    //   bar: 2,
    // });

    // const fooRef = toRef(state, "foo"); // ObjectRefImpl {_object: Proxy, _key: "foo", __v_isRef: true, value: state.foo}
    // console.log(fooRef);
    // console.log(state);
    // // const rrr = reactive({ fooRef })
    // fooRef.value++;
    // console.log(state.foo); // 2

    // state.foo++;
    // console.log(fooRef.value); // 3
    // // 可选prop处理
    // console.log(props.aaa);
    // const a1 = toRef(props, "aaa");
    // console.log(a1);
    // a1.value += '无中生有'; // Set operation on key "aaa" failed: target is readonly. Proxy {}
    // console.log(a1.value);
    // console.log(props.aaa);

    // customRef
    function useDebouncedRef(value, delay = 200) {
      let timeout;
      return customRef((track, trigger) => {
        // console.log(track); //   () => track(this, "get", "value")
        // console.log(trigger); // () => trigger(this, "set", "value")
        return {
          get() {
            track();
            return value;
          },
          set(newValue) {
            console.log(newValue);
            clearTimeout(timeout);
            timeout = setTimeout(() => {
              value = newValue;
              trigger();
            }, delay);
          },
        };
      });
    }
    console.log(useDebouncedRef("hello")); // CustomRefImpl {__v_isRef: true, _get: ƒ, _set: ƒ}

    // // shallowRef
    // const foo = shallowRef({
    //   deep: {
    //     name: "deep",
    //   },
    // });
    // console.log(foo); // RefImpl {_rawValue: {…}, _shallow: true, __v_isRef: true, _value: {…}}
    // foo.value.deep.name = "shallowRef";
    // console.log(isReactive(foo.value));
    // console.log(isRef(foo));
    // // 第一次运行时记录一次 "Hello, world"
    // watchEffect(() => {
    //   console.log(foo.value.deep);
    // });
    // triggerRef(foo) // 手动触发，shallow只响应式化一层引用只，嵌套内容不会触发副作用watchEffect，可以手动触发记录一次。
    
    return {
      // count,
      // obj,
      text: useDebouncedRef("hello"),
    };
  },
};
</script>
