import './assets/styles/index.css'
// 全局引入axe-ui
import { createApp } from 'vue'
import App from './App.vue'
import Axe from 'axe-ui'
import 'axe-ui/dist/axe.css'
createApp(App).use(Axe).mount('#app')


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