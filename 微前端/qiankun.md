# qiankun

qiankun，基于 single-spa，支持预加载、沙箱（js、css ）、通信、动态样式隔离、全局方法……

## qiankun 特性

### 预加载

### 全局状态管理+ 通信
发布-订阅的设计模式

qiankun 通过 [initGlobalState, onGlobalStateChange, setGlobalState](https://qiankun.umijs.org/zh/api#initglobalstatestate) 实现主应用的全局状态管理，然后默认会通过 props 将通信方法传递给子应用。

### 沙箱

- 快照沙箱（loose: true）：给 window 对象增加快照，清除前缓存对象，下次恢复后将属性再加回来。【只适用于单例应用】
- Proxy 代理：并做 proxy 代理，

### 样式隔离方案：

**一、子应用之间样式隔离：**
切换子应用时，动态加载/删除样式
**二、主应用与子应用之间样式隔离：**

1、BEM(Block Element Modifier) 规范不靠谱

2、css-modules 打包时给类名加 hash 值使其唯一不冲突（主应用设置沙箱 sandbox，并不完全隔离）

```js
start({
  sandbox: {
    experimentalStyleIsolation: true,
  },
})
```

3、shadowDOM 真正意义上的隔离（有全局样式的问题，尽量不用。缺点：兼容性不好，里边的样式外边不能复用）
`web-components`、`attachShadow`
![](2022-03-22-19-56-36.png)

```js
start({
  sandbox: {
    strictStyleIsolation: true,
  },
})
```

4、css-in-js 不推荐使用

### JS 沙箱（面试题：如何实现 JS 沙箱？）

沙箱：一个干净的环境  
切换子应用，还原 window 状态

## qiankun 源码

内置五个生命周期

- afterMount
- afterUnmount
- beforeLoad
- beforeMount
- beforeUnmount
