import * as VueRouter from 'vue-router'
import menuConfig from '../utils/menus'
// 1. 定义路由组件.
// 也可以从其他文件导入
// const Home = () => import('../views/Home.vue')

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
function getRoutes() {
  let routes = []
  for (const route of menuConfig) {
    routes.push({
      name: route.fileName.toLowerCase(),
      path: route.path,
      component: () => import(`../views/${route.fileName}.vue`)
    })
  }
  return routes
}
const routes = getRoutes()

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router