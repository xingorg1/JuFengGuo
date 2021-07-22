<template>
  <h3>reactive定义响应式数据：接收一个对象作为参数，并返回一个代理对象</h3>
  <div class="area">
    {{ obj.name }}
  </div>
  <div class="area">
    {{ shallowObj3 }}
  </div>
</template>

<script lang="ts">
import {
  reactive,
  shallowReactive,
  ref,
  toRaw,
  isProxy,
  isReactive,
  readonly,
  shallowReadonly,
  watchEffect,
  markRaw,
} from "vue";
export default {
  name: 'ReactiveVue',
  setup() {
    // 使用 reactive() 函数定义响应式数据；
    const obj = reactive({
      name: "reactive-test",
    });
    console.log(obj); // Proxy {name: "reactive-test"}
    // toRaw
    console.log(toRaw(obj));
    // 一秒后修改响应式数据，视图会重新修改
    setTimeout(() => {
      obj.name += " !!";
    }, 1000);
    setTimeout(() => {
      toRaw(obj).name += " 偷偷改了原生数据～"; // 非响应式数据，更新不主动变视图。只是改了数据但是视图没更新，下一次响应式数据修改更新视图的时候才能更新上去
      console.log(obj.name);
    }, 2000);
    // 解包ref
    const count = ref(1); // RefImpl {_rawValue: 1, _shallow: false, __v_isRef: true, _value: 1}
    const obj1 = reactive({ count });
    console.log(obj1.count === count.value);
    console.log(obj1, count);
    console.log(isProxy(obj1), isProxy(count));
    console.log("isReactive", isReactive(obj1), isReactive(count));

    // readonly
    console.log(readonly({ name: "readonly" })); // Proxy {name: "readonly"} 从打印上和reactice看不出区别来
    const original = reactive({ count: 0 });
    const copy = readonly(original);
    console.log("isProxy", isProxy(copy));
    console.log("isReactive", isReactive(copy));
    console.log(copy);
    watchEffect(() => {
      // 用于响应性追踪
      console.log(copy.count);
    });
    setTimeout(() => {
      // 变更 original 会触发依赖于副本的侦听器
      original.count++;
      // 变更副本将失败并导致警告
      copy.count++; // 警告!
    }, 1500);

    // 解包ref
    const raw = {
      count: ref(123),
    };
    const copy1 = readonly(raw);
    console.log(raw, copy1);
    console.log(raw.count.value); // 123
    console.log(copy1.count); // 123

    // markRaw
    const foo = markRaw({
      name: "foo",
    });
    console.log(foo); // {name: "foo", __v_skip: true}
    console.log(reactive(foo)); // 和foo一样，说明没被代理
    console.log(isReactive(reactive(foo))); // false

    // 嵌套在其他响应式对象中时也可以使用
    const bar = reactive({ foo });
    console.log(bar);
    console.log(isReactive(bar.foo)); // false

    const zoo = markRaw({
      like: {
        name: "zoo",
      },
    });
    const zooProxy = reactive({
      like: zoo.like,
    });
    console.log(zoo, zoo.like);
    console.log(zooProxy, zooProxy.like);
    console.log(zooProxy.like === zoo.like); // false zoo不能被代理，但是zoo.like还能被代理。所以reactive深度代理后，二者不相等了
    /* 
      官方提醒：上边例子是进阶的运用，因为原始选择退出仅在根级别，因此，如果将嵌套在内的、未标记的原始对象添加进响应式对象，然后再次访问该响应式对象，就会得到原始对象被代理后的版本。这可能会导致同一性风险——即执行一个依赖于对象本身的操作，但同时使用同一对象的原始版本和被代理后的版本：
      大致意思：markRaw是将一个对象的根级别设置为不可代理。但是它里边的嵌套对象还是能被代理的。所以如果把里边的对象不小心代理了（就像上边zooProxy中zoo.like的引用赋值那种写法，reactive将zooproxy嵌套对象都给代理了，导致zoo.like也被代理了）
      之后再想用zoo.like的原生对象和zooProxy.like代理对象做比较是否相同，就不是了。（同一性比较）
      你可能认为，我故意让zoo这段不能被代理了，然后把这段放到代理对象里边她也不能被代理，但其实不是。他还是被代理了。所以就会造成使用上的风险。（同一性风险）
    */

    // shallowReactive
    const obj3 = {
      foo: 1,
      bar: {
        name: "bar",
      },
      zoo: ref("zoo"),
    };
    const shallowObj3 = shallowReactive(obj3);
    console.log(shallowObj3);
    setTimeout(() => {
      shallowObj3.foo++;
    }, 2000);
    setTimeout(() => {
      // 非响应式数据，更新不主动变视图
      shallowObj3.bar.name += "!!";
      shallowObj3.zoo.value += "!!";
    }, 2500);
    watchEffect(() => {
      console.log(shallowObj3);
    });
    return {
      shallowObj3,
      obj,
    };
  },
};
</script>
