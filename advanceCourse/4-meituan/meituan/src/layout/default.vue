<template lang="pug">
  //- 整个页面上中下结构的模板
  .page-default
    el-container
      el-header
        MyHeader
      el-main Main
      el-footer Footer
  </div>
</template>

<script>
import MyHeader from '@/components/header/index.vue'//"@/"可以表示根目录的src文件夹
export default {
  name: 'Default',
  components: {
    MyHeader
  }
};
</script>

<style lang="scss">
@import '@/assets/css/public.scss';
</style>
