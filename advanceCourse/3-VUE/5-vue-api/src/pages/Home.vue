<template>
  <div class="home">
    <ul>
      <li>
        <router-link to="/app-api">vue</router-link>
      </li>
      <li>
        <router-link :to="{name: 'app-echarts'}">echarts</router-link>
      </li>
      <li>
        <router-link :to="{name: 'app-antv'}">antv</router-link>
      </li>
      <!-- <li>
        <router-link to="/app-datetime">datetime</router-link>
      </li>-->
      <li>
        <router-link to="/app-vant">vant</router-link>
      </li>

      <li>
        <router-link to="/xlsx">xlsx</router-link>
      </li>
      <!-- <li>
        <router-link to="/xlsxDown">xlsx高级下载</router-link>
      </li>-->
      <li>
        <router-link to="/Element">Element</router-link>
      </li>
      <li>
        <router-link to="/CodeEditor">代码编辑器</router-link>
      </li>
      <li>
        <router-link to="/VueCodeMirror">代码编辑器-基于vue二次封装</router-link>
      </li>
    </ul>
    <hr />
    <router-view></router-view>
    <img src="/static/img/test.jpg" alt="">
    <img :src='imgUrl' alt="">
  </div>
</template>

<script>
// import AppEcharts from '@/components/AppEcharts.vue';
// import AppAntv from '@/components/AppAntv.vue';
// import AppAntv from '@/components/AppAntv.vue';
export default {
  name: 'Home',
  data: () => {
    return {
      imgUrl: "/static/img/test.jpg"
    }
  }
  // components:{
  //     AppEcharts,
  //     AppAntv
  // }
}
</script>

<style lang="less">
// @pre-blue :  #5B83AD;
// @link: #333;
// .home ul {
//   line-height: 35px;
//   overflow: hidden;
// }
// .home li {
//   float: left;
//   margin-right: 10px;
//   overflow: hidden;
//   border-radius: 8px;
//   color: #333;
//   // color: @pre-blue
// }
// .home li a {
//   color: @link;
//   display: block;
//   padding: 0 8px;
//   background: rgba(28, 113, 203, 0.1);
//   &:hover,&.router-link-exact-active.router-link-active {
//     background: rgba(30, 139, 255, 0.44);
//     color: #033939;
//   }
// }
</style>
