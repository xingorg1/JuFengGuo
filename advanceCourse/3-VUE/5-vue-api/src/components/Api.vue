<template>
  <div class="api-test">
    {{ obj.a.v}}
    <h3 :class="{'my-class': `${isA} + ${isB}` == `${isC}`}">动态绑定class {{isA + isB }}</h3>
    <p>这用错了，得到一个字符串加法表达式啊：{{`${isA} + ${isB}`}}、{{`${isA} + ${isB}` == `${isC}`}}</p>
    <div class="test" ref="test">
      <p>这是原内容，颜色为绿</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Api",
  data() {
    return {
      isA: "A",
      isB: "B",
      isC: "AB",
      obj: {
        a: {
          v: "第一次"
        }
      }
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
