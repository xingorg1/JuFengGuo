<template lang="pug">
  //- 下拉列表组件
  .navList.nl01
    el-link(
        type="info" 
        href="#" 
        target="_blank" 
        v-for="(item,i) in navlistData" 
        :key="item.id"
        :href="item.href"
    ) {{item.name}}
</template>

<script>
export default {
  name: 'navList01',
  props:['navlistData'],
  data(){
    return {

    }
  }
}
</script>

<style>

</style>
