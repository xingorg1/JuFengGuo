# 代理与反射
代理是 ECMAScript 6 新增的令人兴奋和动态十足的新特性。尽管不支持向后兼容，但它开辟出了 一片前所未有的 JavaScript 元编程及抽象的新天地。
从宏观上看，代理是真实 JavaScript 对象的透明抽象层。代理可以定义包含捕获器的处理程序对象， 而这些捕获器可以拦截绝大部分 JavaScript 的基本操作和方法。在这个捕获器处理程序中，可以修改任 何基本操作的行为，当然前提是遵从捕获器不变式。
与代理如影随形的反射 API，则封装了一整套与捕获器拦截的操作相对应的方法。可以把反射 API 看作一套基本操作，这些操作是绝大部分 JavaScript 对象 API 的基础。
代理的应用场景是不可限量的。开发者使用它可以创建出各种编码模式，比如(但远远不限于)跟 踪属性访问、隐藏属性、阻止修改或删除属性、函数参数验证、构造函数参数验证、数据绑定，以及可 观察对象。
## 代理 Proxy

拦截并向基本操作嵌入额外行为的能力：
具体地说，可以给目标对象定义一个关联的代理对象，而这个代理对象可以作为抽象的目标对象来使用。在对目标对象的各种操作影响目标对象之前，可以在代理对象中对这些操作加以控制。

代理是目标对象的抽象、替身。

### 创建代理、空代理

代理是使用 Proxy 构造函数创建的。

#### 函数签名：

1、目标对象（必填）
2、处理程序对象（必填）

#### 空代理：

什么也不做的代理对象。第二个参数可以传一个简单的对象字面量，什么也不做。

## 捕获器（trap）

handler 的操作函数

一个 handler 处理程序对象里可以有多个操作函数。

### 一个 get()捕获器的例子

有了这些参数，就可以重建被捕获方法的原始行为

```js
const target = {
  foo: 'bar',
}
const handler = {
  // 捕获器在处理程序对象中以方法名为键
  get() {
    return 'handler override'
  },
}
const proxy = new Proxy(target, handler)

console.log(target.foo) // bar
console.log(proxy.foo) // handler override
console.log(target['foo']) // bar
console.log(proxy['foo']) // handler override
console.log(Object.create(target)['foo']) // bar
console.log(Object.create(proxy)['foo']) // handler override
```

proxy[property]、proxy.property 或 Object.create(proxy)[property]等
所有这些操作只要发生在代理对象上，就会触发 get()捕获器。
发生在目标对象上，因为不会经过代理对象所以不会触发。

## 反射 Reflect

处理程序对象中所有可以捕获的方法都有对应的反射(Reflect)API 方法。
这些方法与捕获器拦截的方法具有相同的名称和函数签名（参数也一致），而且也具有与被拦截方法相同的行为。
因此，使用反射 API 也可以像下面这样定义出空代理对象:

```js
const handler = {
  get() {
    return Reflect.get(...arguments)
  },
}
```
不需要定义处理程序对象，直接创建一个可以捕获所有方法，然后将每个方法转发给对应反射 API 的空代理
```js
new Proxy(target, Reflect)
```

但也不能玩的过火，注意分寸，别得意忘形，不记得自己啥身份～ 一个代理对象还想偷梁换柱？！
## 捕获器不变式 (trap invariant)
捕获器不变式因方法不同而异，但通常都会防止捕获器定义出现过于反常的行为

比如，如果目标对象有一个不可配置且不可写的数据属性，那么在捕获器返回一个与该属性不同的
值时，会抛出 TypeError:
```js
const targetConstant = {}
Object.defineProperty(targetConstant, 'foo', {
  configurable: false,
  writable: false,
  value: 'bar',
})
const handlerObj = {
  get() {
    return 'qux' // 报错：proxy.html:75 Uncaught TypeError: 'get' on proxy: property 'foo' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value (expected 'bar' but got 'qux')
    // return 'bar' // 正常
  },
}
const proxyObj = new Proxy(targetConstant, handlerObj)
console.log(proxyObj.foo) // TypeError
```
感觉这种写法可以用到组件内部，防止外部使用代理对象移花接木了

## 可撤销代理
世界上没有后悔药，但是代码里有

对于使用 new Proxy()创建的普通代理来说，这种联系会在代理对象的生命周期内一直持续存在。
但我们还可以用另一种方式创建可撤销代理
### revocable()方法
这个方法支持撤销代理对象与目标对象的关联。
撤销代理的操作是不可逆的。
撤销函数(revoke())是幂等的，调用多少次的结果都一样。
撤销代理之后 再调用代理会抛出 TypeError。
```js
const target = {
  name: '目标对象'
}
const handler = {
  get() {
    return '处理程序对象'
  }
}
// 终身代理，永久有效
const proxy = new Proxy(target, handler)
console.log(proxy.name)

// 可撤销的代理
const { proxy: proxy1, revoke } = Proxy.revocable(target, handler)
console.log(proxy1, proxy1.name)
console.log(target.name)

revoke() // 执行撤销，罢免代理
console.log(proxy1, proxy1.name) // TypeError: Cannot perform（执行） 'get' on a proxy that has been revoked
```
没想明白撤销有什么用






## 扩展理解：

设计模式中的代理模式，
一个比较通俗的例子：明星经纪人，就是明星对象的代理对象。针对粉丝对明星的一些操作，做一层保护代理和虚拟代理。
地址：https://www.cnblogs.com/dengyao-blogs/p/11713185.html

Nginx 部署的代理服务器
做的就是网络分发、缓存、提速、安全保障等代理的工作

生活中，代理商的身份和做的事情
