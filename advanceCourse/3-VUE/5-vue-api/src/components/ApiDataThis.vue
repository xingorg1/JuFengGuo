<template>
  <div class="area">
    <button @click="func">@click=func 指向null</button><br>
    <button @click="func()">@click=func() 指向当前组件</button>
  </div>
</template>
<script>
const {log} = console
export default {
  name: 'ApiDataThis',
  data: function () {
    return {
      func: function(e) {
        log('e：', e)
        log('this：', this)
      }
    }
  }
}
</script>