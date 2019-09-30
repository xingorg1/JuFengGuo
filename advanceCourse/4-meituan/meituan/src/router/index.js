import Vue from 'vue'
import Router from 'vue-router'
import DefaultPage from '@/layout/default'
import BlankPage from '@/layout/blank'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'blankPage',
      component: BlankPage
    },
    {
      path: '/home',
      name: 'defaultpage',
      component: DefaultPage
    }
  ]
})
