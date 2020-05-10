<template>
  <div id="app">
    <!-- <Home/> -->
    <router-view></router-view>
    <h1>
      结果为：{{ result }}
    </h1>
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
  },
  data() {
    return {
      name: 'one'
    }
  },
  computed: {
    result(){
      // setTimeout(() => {
      //   this.name = 1
      // }, 1000)
      return this.name
    }
  }
}
</script>

<style>
#app {
  padding: 20px;
}
</style>
