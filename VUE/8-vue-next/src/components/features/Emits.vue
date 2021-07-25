<template>
  <axe-button @click="$emit('click')"
    >发送事件，因为事件名字的原因，不注册emits会触发两次</axe-button
  >

  <axe-button @click="handleClick">
    emits注册submit事件，并验证事件参数
  </axe-button>
</template>

<script>
export default {
  /* 第一种写法 */
  // emits: ['click'], // 不注册事件名称，这个click就会触发两次：自定义事件一次、原生事件一次
  /* 第二种写法 */
  emits: {
    // 没有验证函数
    click: null,

    // 带有验证函数
    submit: (payload) => {
      console.log('submit验证函数', payload);
      if (payload.email && payload.password) {
        return true;
      } else {
        console.warn(`Invalid submit event payload!`);
        return false;
      }
    },
  },
  setup() {
    // const click = function(e) {
    //   console.log(this, e);
    // }
    return {
      // click,
    };
  },
  methods: {
    handleClick () {
      console.log(123123, this);
      this.$emit("submit", {
        // emial: "我的邮箱地址",
        password: "我的密码",
      });
    },
  },
};
</script>

<style>
</style>