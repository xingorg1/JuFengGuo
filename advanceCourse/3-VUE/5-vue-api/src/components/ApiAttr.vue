<template>
  <div class="api-attr area">
    <h4>$attrs & $listeners</h4>
    <p>所有父组件传递过来的属性，减去props接收后的属性，等于this.$attrs的所有属性</p>
    <button @click="handleListeners">触发父组件为子组件绑定的事件</button>
    <ApiListeners v-on="$listeners" />
  </div>
</template>
<script>
import ApiListeners from './ApiListeners.vue'
const {log} = console
export default {
  name: "ApiAttr",
  components: {
    ApiListeners
  },
  props: {
    syncData: {
      type: String,
      defalt: {}
    }
  },
  data() {
    return {
      
    };
  },
  mounted() {
    log('$props', JSON.stringify(this.$props))
    log('$attrs', this.$attrs)
    log('$listeners', this.$listeners)
  },
  methods: {
    handleListeners() {
      this.$listeners.handleClick.fns('子组件触发！')
      // 上边代码等同于下边写法的效果
      // this.$emit('handleClick', '子组件发射')
    }
  }
};
</script>