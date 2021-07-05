<template>
  <div class="community">
    <h1>社区</h1>
    <ul class="community-nav">
        <!-- 第一种写法，to一个完整的路径 -->
        <router-link tag="li" to="/community/academic">学术讨论</router-link>
        <!-- 第一种写法，to绑定对象，path和router.js里的不太一样，router.js里path不用完整写前边的，这里必须。 -->
        <router-link tag="li" :to="{path: '/community/download'}">资料下载</router-link>
        <!-- 第三种写法，同绑定对象，填name的配置。个人觉着这种写法更省心，省的配路径了。 -->
        <router-link tag="li" :to="{name: 'personal'}">个人中心</router-link>
    </ul>
    <div class="cont">
      <router-view></router-view>
    </div>
  </div>
</template>
<style >
  .community-nav{
    overflow: hidden;
    padding: 5px 0;
    margin-top: 10px;
  }
  .community-nav li{
    float: left;
    margin-right: 10px;
    font-size: 18px;
  }
  .community-nav li:hover,
  .community-nav li.router-link-exact-active{
    cursor: pointer;
    color: #6e48ff;
    font-weight: bold;
  }
  .community .cont{
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #f1f1f1;
  }

</style>

