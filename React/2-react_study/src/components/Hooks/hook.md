# 文档笔记

> Hook 使用了 JavaScript 的闭包机制，而不用在 JavaScript 已经提供了解决方案的情况下，还引入特定的 React API。

## useEffect：
告知在渲染(render)后，执行什么操作。react会在每次更新dom（render渲染）后执行这个函数的回调。
> React 保证了每次运行 effect 的同时，DOM 都已经更新完毕。

第一个参数是回调函数，回调函数的执行时机，类似于class组件内的componentDidMount和componentDidUpdate。默认的：在第一次渲染之后和每次更新之后，回调函数都会执行。

如果是在class的生命周期，要实现下边的效果，下边的代码就要在componentDidMount和componentDidUpdate两个周期里都执行下（因为一个是初始化渲染后的、一个是dom更新后的。不过都是render执行后的）。

