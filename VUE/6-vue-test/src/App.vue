<template>
  <div id="app">
    <HelloWorld msg="vue test"/>
    <my-count />
    <button @click="myDispatch">点击触发dispatch</button>
    <!-- <ul>
      <li>
        <router-link to="/home">home</router-link>
      </li>
      <li>
        <router-link to="/about">about</router-link>
      </li>
    </ul>
    <router-view></router-view> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from './components/HelloWorld.vue'
import MyCount from './components/MyCount.vue'
import store from '@/store'
@Component({
  components: {
    HelloWorld,
    MyCount
  }
})
export default class App extends Vue {
  appName: string = '我是app啊'
  created () {
    // console.log(this.$velocity)
  }
  myDispatch () {
    store.dispatch('changeNumAsync')
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
