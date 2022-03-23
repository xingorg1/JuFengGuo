# 微前端实战学习

练习仓库：https://github.com/xingorg1/qiankun-example

## qiankun
- demo：[乾坤demo](https://github.com/fengxianqi/qiankun-example)
- 视频讲解：[珠峰课堂](http://www.javascriptpeixun.cn/course/3363/task/220091/show#) 【或者：[珠峰课程-优酷](https://list.youku.com/albumlist/show/id_67903156)】

qiankun就是基于single-spa，做了预加载、沙箱（js、css ）、通信、动态样式隔离、全局方法
### 预加载
### 通信
### 沙箱
- 快照沙箱（loose: true）：给window对象增加快照，清除前缓存对象，下次恢复后将属性再加回来。【只适用于单例应用】
- Proxy代理：并做proxy代理，

### 样式隔离方案：
#### 一、子应用之间样式隔离：
切换子应用时，动态加载/删除样式
#### 二、主应用与子应用之间样式隔离：

1、BEM(Block Element Modifier) 规范不靠谱

2、css-modules打包时给类名加hash值使其唯一不冲突（主应用设置沙箱 sandbox，并不完全隔离）

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

### JS沙箱（面试题：如何实现JS沙箱？）
沙箱：一个干净的环境  
切换子应用，还原window状态

# qiankun 源码
内置五个生命周期
- afterMount
- afterUnmount
- beforeLoad
- beforeMount
- beforeUnmount