import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
console.log(Router.prototype);
Vue.use(Router);
// new Router就是$router
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',//加上home关键字，这样路由的样式可以用包含匹配“router-link-active”类名了。
      name: 'home',
      component: Home,
      // redirect: '/'//让home路由重定向到根路由，路径里就不用带home关键字了。
      beforeEnter(to,from,next){
        console.log('beforeEnter',to,from,next);
        next()
      }
    },
    /*  {
      path: '/',
      redirect: '/home'
    }, */
    {
      path: '/study',
      name: 'study',
      component: () => import('../views/Study'),
      meta: {
        login: true//后期检查哪个路径上有这个，就需要去跳转到登录页面
      }
    },
    {
      path: '/student',
      name: 'student',
      component: () => import('../views/Student')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About')
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('../views/Community'),
      redirect: '/community/academic',//表示进入到community路由后，重定向到另一个路由下（这里设置重定向到了其子路由“/community/academic”下）
      meta: {
        login: true
      },
      children: [
        // 嵌套路由 - 相当于把routes再写一遍,有几个子路由就有几个对象
        {
          path: '/community/academic',
          name: 'academic',
          component: () => import('../views/Academic')
        },
        {
          path: 'download', //"/community/"就可以省略了，看到download前边没有'/'他会向上找，找到‘/community’就会将其拼接在一起。如果download前边有“/”，就不会向上找，就相当于一级路由了。
          name: 'download',
          component: () => import('../views/Download')
        },
        {
          path: 'personal',
          name: 'personal',
          component: () => import('../views/Personal')
        }
      ]
    },
    {
      // path: '/article',
      // path: '/article/:id',//添加id配置后，表示此路径后边不定，形似"/artivle/xxx"的任何路径都可以跳转到这个页
      path: '/article/:id',
      name: 'article',
      component: () => import('../views/Article'),
      // children: [
      //   {
      //     path: '201901'
      //   },
      //   {
      //     path: '201902'
      //   },
      //   {
      //     path: '201903'
      //   }
      // ]
      beforeEnter(to,from,next){
        console.log('router.js - beforeEnter');
        next()
      }
    },
    {
      path: '/login',
      name: 'login',
      component: ()=>import('../views/Login')
    },
    {
      // 配置404页面路由
      path: '/404',
      name: '404',
      component : () => import('../views/404')
    },
    {
      path: '*',
      redirect (to) {
        // redirect还可以是一个函数。接收一个to参数。to里边包含的就是要跳转的信息。
        console.log(to);
        if(to.path === '/'){
          return '/home'
        }else{
          return '/404'
        }
      }
    }
  ]
})