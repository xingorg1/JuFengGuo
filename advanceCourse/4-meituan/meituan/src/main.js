import Vue from 'vue'
// 引入Element-ui组件
import '../theme/index.css'//引入自己自定义的主题
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css' //删掉之前的
import App from './App'
import router from './router'

Vue.use(ElementUI,{
  zIndex: 10
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
