<template>
  <div class="api-listeners area">
    <h4>$listeners</h4>
    <p></p>
    <button @click="handleListeners">触发父组件为子组件绑定的事件</button>
  </div>
</template>
<script>
const {log} = console
export default {
  name: "ApiListeners",
  props: {
  },
  data() {
    return {
      
    };
  },
  mounted() {
    log('$listeners', this.$listeners)
  },
  methods: {
    handleListeners() {
      // this.$listeners.handleClick.fns('孙子组件触发---！')
      // 上边代码等同于下边写法的效果
      this.$emit('handleClick', '孙子组件触发')
    }
  }
};
</script>