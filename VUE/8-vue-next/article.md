指令：v-bind也是指令。v-这些都是指令，表示特殊的attribute

双向绑定和响应式的区别：
一个是互相驱动、一个是数据驱动视图

“vue不仅可以把数据绑定到 DOM 文本或 attribute，还可以绑定到 DOM 的结构”
dom文本：插值
attribute：v-bind
dom结构：v-if

组件命名
参考了WebComponents规范。实现了slot和is相关内容。
但是不同的是，自定义元素（webComponents）有兼容问题，需要polyfill来处理，而vue除了ie11-其他浏览器表现都一样。
vue还提供一些重要功能：跨组件数据流、自定义事件通信以及构建工具集成。

vue.createApp创建一个vue实例，其原型方法都返回实例本身，达到可以链式调用多个实例方法的作用。特别注意：mount返回的是根组件实例

vue不是完全的mvvm模型

data、methods，props，computed，inject 和 setup等定义的数据会被暴露到vue组件实例上
另外还暴露了一些内置的property，用$做标识符来区分用户定义的属性，主要有以下几个：
 - $: (...)
 - $attrs: (...)
 - $data: (...)
 - $el: (...)
 - $emit: (...)
 - $forceUpdate: (...)
 - $nextTick: (...)
 - $options: (...)
 - $parent: (...)
 - $props: (...)
 - $refs: (...)
 - $root: (...)
 - $slots: (...)
 - $watch: (...)

一系列的初始化过程：设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数

指令参数
```html
<a v-bind:href="url"> ... </a>
<a v-on:click="doSomething"> ... </a>
```
在这里 href 是参数，告知 v-bind 指令将该元素的 href attribute 与表达式 url 的值绑定。
另一个例子是 v-on 指令，它用于监听 DOM 事件：

动态指令参数：
```html
<a v-bind:[attributeName]="url"> ... </a>
```