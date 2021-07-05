import Vue from 'vue' //引入vue
import Router from 'vue-router' // 引入依赖vue-router
import Home from './views/Home.vue' // 引入home路由页面

Vue.use(Router) // use方法，使用vue-router，如果不写路由不生效
// 使用的同时会像路由上添加一些方法：$router 、 $route

export default new Router({//导出（就意味着别的地方还要用）
  mode: 'history',
  // linkExactActiveClass: 'click-link',
  // linkActiveClass: 'has-link',
  routes: [//多个路径数组配置
    // 其中一个路径信息 - 基本配置
    {
      path: '/', //根路径
      name: 'home',
      component: Home //Home组件
    },
    {
      path: '/about',//路径
      name: 'about',
      // route level code-splitting 
      // 路线级别代码分隔
      // this generates a separate chunk (about.[hash].js) for this route
      // 这将为该路由生成一个单独的块(大约.[hash].js)
      // which is lazy-loaded when the route is visited.
      // 当访问路由时，它是惰性加载的。
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
      // 作用是懒加载。如果都在顶部像引入Home那样去import引入很多个其他组件，就会影响加载效率。懒加载提高首屏加载时间。其他页面是切换时才会加载对应组件。
    }
  ]
});
