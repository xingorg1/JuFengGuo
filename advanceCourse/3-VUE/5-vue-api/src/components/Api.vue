<template>
  <div class="api-test">
    {{ obj.a.v}}
    <h3 :class="{'my-class': `${isA} + ${isB}` == `${isC}`}">动态绑定class {{isA + isB }}</h3>
    <p>这用错了，得到一个字符串加法表达式啊：{{`${isA} + ${isB}`}}、{{`${isA} + ${isB}` == `${isC}`}}</p>
    <div class="test" ref="test">
      <p>这是原内容，颜色为绿</p>
    </div>
    <h3>未经声明的属性，不能直接使用，但是声明一个对象，使用对象身上未定义的属性，没有关系。</h3>
    <input type="text" v-model="obj.name" />
    <span>{{obj.name + '1'}}</span>
    <br />
    <!-- <input type="text" v-model="name">
    <span>{{name}}</span>-->
    <ApiChild :syncData.sync="syncData2" :obj.sync="obj" v-bind.sync="obj2" />
  </div>
</template>

<script>
import ApiChild from "./ApiChild.vue";
console.log(ApiChild);
export default {
  name: "Api",
  components: {
    ApiChild
  },
  data() {
    return {
      isA: "A",
      isB: "B",
      isC: "AB",
      obj: {
        a: {
          v: "第一次"
        },
        b: "第二次",
        c: false
      },
      obj2: {
        name1: "obj2",
        age1: 1
      },
      syncData2: "父组件给的数据"
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.test.innerHTML += `
        <div class="new">这是新内容，去掉style的scoped属性，就为红色</div>
      `;
    });
  },
  watch: {
    // watch监听嵌套对象
  }
};
</script>

<style scoped lang="scss">
.test {
  background: lightblue;
  p {
    color: green;
  }
  .new {
    color: pink;
  }
  // scoped穿透
  >>> .new {
    color: red;
  }
}
</style>
