<template>
  <div class="api-child" style="border: 1px solid red; padding: 3px">
    <h3>{{sonName}}</h3>
    <a
      href="https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6"
    >sync官方地址</a>
    <div>{{syncData}}</div>
    <div>{{obj.a}}</div>
    <div>{{obj.b}}</div>
    <div>{{obj.c}}</div>
    <button @click="changeObj">dianji</button>
    <h4>sync传递多个属性并同时绑定事件</h4>
    <div>
      {{name1}}
      <input type="text" @input="inputChange" />
    </div>
    <div>
      {{age1}}
      <button @click="changeObj2">dianji</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "ApiChild",
  props: {
    syncData: {
      type: String,
      required: true
    },
    obj: {
      type: Object
    },
    obj2: {
      type: Object
    },
    name1: String,
    age1: Number
  },
  data() {
    return {
      sonName: "子组件 - v-bind.sync"
    };
  },
  mounted() {
    console.log(this, this.a);
    console.log(this.obj.a, this.obj.c, this.obj.b);
    console.log("sync传递多个属性", this.obj2, this.name1, this.age1);
  },
  methods: {
    inputChange($event) {
      console.log($event);
      console.log(this.name1);
      this.$emit("update:name1", $event.target.value);
      console.log(this.name1);
    },
    changeObj() {
      console.log(this.obj.c);
      this.obj.c = !this.obj.c;
      console.log("=====");
      console.log(this.obj.c);
      console.log("++++");
    },
    changeObj2() {
      console.log(this.age1);
      this.$emit("update:age1", this.age1 + 1);
      console.log("==可以直接$emit修改，父组件不用写change事件监听了===");
      console.log(this.age1);
      console.log("++++");
    }
  }
};
</script>