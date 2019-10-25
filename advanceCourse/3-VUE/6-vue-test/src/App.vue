<template>
  <div id="app">
    <HelloWorld msg="vue test"/>
    <my-count />
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

@Component({
  components: {
    HelloWorld,
    MyCount
  }
})
export default class App extends Vue {
  appName: string = '我是app啊'
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
