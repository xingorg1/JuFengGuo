<template>
  <div class="api-listeners area">
    <h4>$emit</h4>
    <button @click="emitHandleClick">emit触发</button>
  </div>
</template>
<script>
const {log} = console
export default {
  name: "ApiEmitOn",
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
    emitHandleClick() {
      log('ApiEmitOn btn click')
      this.$emit('emitHandleClick', 'ApiEmitOn组件触发emit')
    }
  }
};
</script>