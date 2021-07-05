<template>
  <div class="academic">
    <h3>学术讨论</h3>
    <ul class="article-list">
      <li 
        v-for="(item) in questionList" 
        :key="item.id" 
        @click="goToQuestion(item.id)"
      >
      {{ item.title }}
      </li>
      <!-- 这里可以写成router-link的形式跳转路由，也可以事件中执行$router.push()的方式跳路由 -->
      <!-- <router-link :to="{path: '/article/201801'}"></router-link> -->
      <!-- <router-link :to="{path: `/article/${item.id}`}"></router-link> -->
      <!-- <router-link :to="`/article/${item.id}`"></router-link> -->
      <!-- <router-link :to="{name: `article`, params: {id: item.id}}"></router-link> -->
    </ul>
  </div>
</template>
<script>
export default {
  beforeRouteEnter(to, from, next) {
    // console.log(this);//路由没进来，拿不到实例对象的信息
    next((vm)=>{
      // console.log(vm);//当前路由页面、vue组件实例对象的信息
    })
  },
  methods:{
    goToQuestion(i){
      // console.log(i,`/article/${i}`) // i = "201901"
      // 写法1
      this.$router.push(`/article/${i}`)
      // 写法2
      /* this.$router.push({
        name: 'article',
        params: {//明确设置params
          id: i 
        }
      }); */
      // 写法3
      // this.$router.push(`/article/?articleId=${i}`)
      // 写法4
      /* this.$router.push({
        name: 'article',
        query: {//明确设置params
          articleId: i 
        }
      }); */
    }
  },
  data() {
    return {
      questionList: [
        {
          id: 201901,
          title: "问题一：阿黑客帝国和我我阿大为规范娃儿发啊？"
        },
        {
          id: 201902,
          title: "问题二：卡的罚款概念股吗？"
        },
        {
          id: 201903,
          title: "问题三：接口爱的脑儿我发你媕娿呢？"
        }
      ]
    };
  }
};
</script>
<style>
.article-list {
  margin: 10px 0;
}
.article-list li {
  margin-bottom: 10px;
  cursor: pointer;
}
.article-list li:hover {
  text-decoration: underline;
  color: #6e48ff;
}
</style>



