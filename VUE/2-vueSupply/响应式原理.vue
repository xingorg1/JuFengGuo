<template>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      a: 1
    } 
  }
}
</script>

// https://cn.vuejs.org/v2/guide/reactivity.html

new Vue({
  init() { // 在初始化时
    // 递归data里的每一项，Observer包装
    id = 0
    data.val.dep ={
      id = id++
      subs: [] // 用于存放使用过这个数据的wather对象
    } // 这里表述不太正确，基本意思就是每一个变量在递归进行object.defineProperty包装时都会加一个dep属性
    Object.defineProperty(data.val, {
      getter(),
      setter()
    })
    // 遇到render、computed、watch等，创建watcher实例把vm包装一层 
    new Watcher(vm) 
    new Watcher(computed func) 
    new Watcher(watch)... 
  }
}) 
一个组件对应一个watcher实例，
Watcher(vm){ 
  if(!vm._watcher){ // init created
    this.id++ // watcher都有编号
    vm._watcher = this // 实力化的watcher对象
    this.vm = vm // watcher实例上挂载vm
  } else {
    this = vm._watcher
  }
  window.globalwatcher = this // 类似老师举例，实际上不是window。而是当前组件执行时的全局变量/作用域内变量
  vm.render()
}

render(h) {
  // 遇到this.val，则给val收集依赖
  return h('div', `${this.val}`)
  this.val.getter(() => {
    this.val.dep = {}
    this.val.dep.subs.push(globalwatcher) // 记录谁在用我。但是这个谁是谁嗯？我去哪里拿？所以用了globalwather这个中转站、代号！。
    // 互相记录彼此
    this._watcher.deps.push(this.val.dep)
    this._watcher.depIds.push(this.val.dep.id)
  })
}

methods: {
  changeVal() {
    this.val = 'newVal'
    // 遇到修改，触发依赖的watcher
    this.val.setter(() => {
      this.val.dep.forEach((globalwatcherItem) => {
        // 找到当初使用这个依赖的wacher，扔进微任务队列等待触发
        Promise.resolve().then(new Watcher(vm))
      })
    })
  }
}

vm.render() {
  // 遇到this.val，则给val收集依赖 …… 循环往复
}

vm.destoryed() {
  delete window.globalwatcher
}