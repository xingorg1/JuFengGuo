<template>
  <div class="not-found">
    <h1>
      404！页面未找到
    </h1>
    <p @click="goBack">回到首页</p>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    goBack(){
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
p{
  cursor: pointer;
}
</style>
