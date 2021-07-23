import './assets/styles/index.css'
// 全局引入axe-ui
import { createApp } from 'vue'
import App from './App.vue'
import Axe from 'axe-ui'
import 'axe-ui/dist/axe.css'
import router from './routers/router'

// vue.createApp创建一个vue实例，其原型方法都返回实例本身，达到可以链式调用多个实例方法的作用。特别注意：mount返回的是根组件实例
// createApp(App).use(Axe).use(router).mount('#app')
const app = createApp(App)
const axe = app.use(Axe)
const route = axe.use(router)
// 以上三个方法，返回的都是app本身，也就是createApp创建的vue实例本身。
const vm = route.mount('#app') // mount的返回值和其他方法不一样
console.log(app); // {_uid: 0, _component: {…}, _props: null, _container: div#app, _context: {…}, …}
console.log(axe); // {_uid: 0, _component: {…}, _props: null, _container: div#app, _context: {…}, …}
console.log(route); // {_uid: 0, _component: {…}, _props: null, _container: div#app, _context: {…}, …}
console.log(vm); // Proxy {…}

// 局部引入axe-ui
// import { createApp } from 'vue'
// import App from './App.vue'
// import {
//   Input,
//   Button
//   // ...其他组件
// } from 'axe-ui'
// console.log(Button)
// // import 'axe-ui/dist/css/input/style.css'
// // import 'axe-ui/dist/css/button/style.css'
// let app = createApp(App)
// app.component(Input.name, Input)
// app.component(Button.name, Button)
// app.mount('#app')