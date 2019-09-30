<template lang="pug">
  .navList02.nl3
    dl
      dt {{navlistData[0]}}
      dd(v-for="(item,index) in navlistData" :key="item.id" v-if="index > 0") 
        el-link(
          type="info" 
          href="#" 
          target="_blank" 
          :href="item.href"
        )
          img(:src="item.src")
</template>

<script>
export default {
  name: 'navList03',
  props: ['navlistData'],
  mounted(){
    console.log(this.navlistData)
  }
}
</script>

<style>

</style>
