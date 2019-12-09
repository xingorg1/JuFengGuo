<template>
  <div id="app">
    <!-- <Home/> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import Home from '@/pages/Home.vue';
// import myCounter from './assets/counter'
// const { log } = console
// log(myCounter, typeof myCounter)
// myCounter += 1
// log(myCounter)

export default {
  name: 'app',
  components: {
    // Home
  }
}
</script>

<style>
#app {
  padding: 20px;
}
</style>
