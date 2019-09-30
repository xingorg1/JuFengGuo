<template lang="pug">
  .navList02.nl2
    dl
      dt {{navlistData[0]}}
      dd(v-for="(item,index) in navlistData" :key="item.id" v-if="index > 0") 
        el-link(
          type="info" 
          href="#" 
          target="_blank" 
          :href="item.href"
        ) {{item.name}}
</template>

<script>
export default {
  name: 'navList02',
  props:['navlistData'],
  mounted(){
  },
  created(){
  },
}
</script>

<style>

</style>
