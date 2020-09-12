import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
/* import Velocity from 'velocity-animate'
console.log(Velocity) */

// 打印test.js的结果

// 从测试实用工具集中导入 `mount()` 方法
// 同时导入你要测试的组件
import { mount } from '@vue/test-utils'

// 现在挂载组件，你便得到了这个包裹器
const wrapper: any = mount(App)

// 你可以通过 `wrapper.vm` 访问实际的 Vue 实例
const vm = wrapper.vm

// 在控制台将其记录下来即可深度审阅包裹器
// 我们对 Vue Test Utils 的探索也由此开始
console.log({ wrapper, vm })
/* let wrapperproto = wrapper['__proto__']
let VueWrapperFun = wrapper.__proto__.constructor
console.log('__proto__指向构造函数的prototype：', wrapperproto)
console.log('function VueWrapper()', VueWrapperFun)
console.log('wrapper的__proto__ === VueWrapper.prototype', VueWrapperFun.prototype === wrapperproto)
console.log('wrapper = new VueWrapper()') */

/*
function VueWrapper(vm, options)
 if ( Wrapper$$1 ) VueWrapper.__proto__ = Wrapper$$1;
  VueWrapper.prototype = Object.create( Wrapper$$1 && Wrapper$$1.prototype );
  VueWrapper.prototype.constructor = VueWrapper;

  return VueWrapper;
 */
Vue.config.productionTip = false
Vue.prototype.$store = store
/* Vue.prototype.$velocity = Velocity */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
