import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'
console.log(store)
router.beforeEach((to, from, next) => {
  console.log('main.js - beforeEach');
  let isHave = to.matched.some(el => el.meta.login); // matched数组中任意一项有login的话都算
  // console.log('isHave', isHave) //需要登录
  if (isHave) {
    // 检查cookie中是否已经登录
    const hadLogin = decodeURI(document.cookie).includes('login=true'); //字符串方法，判断cookie字符串中是否有这一段 
    if (hadLogin) {
      next(); //已经登录过了，直接放行
    } else {
      let rst = window.confirm('您尚未登录，是否前往登录页面？');
      if (rst) {
        next('/login');
      } else {
        // 这里不会写了，不同意时就不执行next了？其他不需要检测的也不执行next了？
      }
    }
  } else {
    next(); //不需要登录就直接运行
  }
});
router.beforeResolve((to, from, next) => {
  console.log('main.js - beforeResolve')
  next();
})
router.afterEach((to, from) => {
  console.log('main.js - afterEach')
});
// import './assets/css/reset.css';//mainjs里边引入的css太偏下，覆盖了其他样式怎么办？

Vue.config.productionTip = false



new Vue({
  //实例化Router对象$router
  router: router,

  store,

  //把App绘制成虚拟dom
  // h就是createElement的写法，自己仿写一下：
  // jsx语法学习：{}写js语法，<>写html语法，事件用“on-事件名”
  render: h => h(App)
  /* render(createElement){
    return  createElement('div',{
      class: 'gjf-app'
    },[
      createElement('h1',{
        class: 'h1-title',
        style: {
          color: '#333',
          fontSize: '18px'
        }
      },'h1内部文案'),
      createElement('h2',{
        class: 'h2-title',
        style: {
          color: '#666',
          fontSize: '16px'
        }
      },'h2内部文案'),
      createElement('h3',{
        class: 'h3-title',
        style: {
          color: '#999',
          fontSize: '14px'
        }
      },'h3内部文案')
    ]);
  } */
  /* render(c) {
    let tag = 'em';//自定义标签
    return(
      <h1 class="h1-class" style={{color: 'rgb(51, 51, 51)', fontSize: '16px'}}>
        h1内部文案
        <h2 class="h2-class" style={{color: 'rgb(102, 102, 102)', fontSize: '14px'}}>
          h2内部文案
          <tag class="zidingyi-class" style={{color: 'rgb(153, 153, 153)', fontSize: '12px'}} on-click = { function() { console.log('哈哈哈') } }>h3内部文案</tag>
        </h2>
      </h1>
    )
  }, */
}).$mount('#app')