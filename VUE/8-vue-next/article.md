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