useState是内置的钩子吗 是的

现在项目是不是都用hooks，不用类这种方式了？ 是的
皕圩送给老师一朵
直接学hooks可以吗 可以

fetch方法是自带的？ 是的
怎么使用快捷方式自动添加的依赖项
fetch是浏览器自带的
老师逻辑清晰，吐词清楚，讲的很好

自定义hooks对比 单纯方法的封装优势就是用了react的hooks吗
ｕｓｅＥｆｆｅｃｔ依赖项是浅比较吗 是的

是浅比较
肯定浅比较 深比较有性能瓶颈



useRef 干啥的？
转发真实dom节点
为什么用useLayoutEffect
老师，为什么positionRef不用useState创建？


注意
如果你是從 class component migrate 程式碼，請注意useLayoutEffect與componentDidMount和componentDidUpdate的呼叫時機是一樣。不過，我們建議先使用useEffect，只當它有問題時才嘗試使用useLayoutEffect。
useLayoutEffect (以下官方說明)
useEffect
useLayoutEffect 不一样
你可以简单的认为 useEffect是在下一个事件环执行的
useLayoutEffect 是微任务 会在渲染前执行
 useEffect 是一个宏任务 会在渲染后

與宣告useEffect本身相同，但它會在所有 DOM 改變後，同步調用。使用它來讀取 DOM layout 並同步重新 render。在瀏覽器執行繪製之前，useLayoutEffect內部的更新將被同步刷新。
positionRef 是啥啊
就是一个普通 的对象 
 格式就是{current:null}
老师，如何获取demo代码？
positionRef 哪裡宣告的??
const positonRef = useRef(...);
touchstart不用加逻辑吗？不在开始时记录开始位置？
假如我有上百个或者更多的元素，需要拖拽，这样会不会有性能的问题


这个自定义hook怎么写的呀  老师串一下
老师，start在哪里执行的？
这个positionRef放在函数外面是不是也一样
positionRef为什么用useState是不是更合适？
尽量不要刷新组件
拖拽这例子不用 useLayoutEffect, 用 useEffect 行吗?
useLayoutEffect会在所有 DOM 改变后，同步调用 ，不是之前吧??
看下代码，老师
useRef是钩子函数，要在react函数里面执行
代码会放出来么老师
usestate会触发渲染
休息5分
来广告哈哈
会拖出可视区域外吧?
老师，如何获取您写的代码？
有录屏吗
强制刷新 那个没懂 老师？
addEventListener监听过多，会不会造成性能问题，
6啊
老师，positionRef如果用useState定义的话是不是就不用forceUpdate呢？
我项目里面用postmessage通信，现在页面很多，postmessage监听过多，偶尔会蹦掉，好像是有性能问题
iframe ？  为啥用postmessage？
shij
时间管理大师
useRef 和 cr


useRef是一个Hooks,只能用在函数组件中，可以多次渲染的保持不变
React.createRef是一个普通 的方法，可以在类组件中使用. 每次调用都会返回一个新的对象
useRef 和 createRef 的区别能说一下吗
这个positionRef放在函数外面是不是也一样 是的
lastX 是原生的就有啊？原生没有，自己写的 
forceUpdate 这个 操作啥原理
这个名字也是随便写的 ,setXXX方法就会让组件刷新
该发言可能违规，仅老师可见
positionRef其实就是一个对象， 没必要用useRef吧
需要的。为什么。因为我们要让它在多次渲染的保持始终同一个对象
positionRef={}
useEffectLayout和微任务是相同优先级吗
任务不是先宏后微吗？为啥useEffectLayout比useEffect先？
每个宏任务结束 后，会清空所有的微任务，再执行下一个宏任务
在宏任务里面先执行微任务
ok
建议看一下事件循环
很丝滑 这个拖拽
这是不是跟浏览器的渲染 有关？
老师，绑定onClick事件不推荐写成onclick={()=>{}}这种，这样的话每次render重新创建函数
useCallback
hooks里return的数组的顺序有关系吗
没有关系。你自定义hook如何返回，你就得如何接收
张晓:hooks里return的数组的顺序有关系吗 没关系



usercallback 里边那个参数怎么传过去的？
useCallback 可以使用闭包形式传值吗
arguments吧
每个宏任务执行完后，会清空所有的微任务，
执行下一个宏任务 那微任务和宏任务的优先级具体规则是怎样的呢 可以简单的理解为微任务的优先级更高吗
可以这样理解
事件环不能套事件环
老师类似于 轮播的 切换我不会诶
哪里不太懂
原理不太懂

轮播图


讲下自定义Hook的流程
hook可以不return内容吗 可以的
就 event
useCallback的源码是这样吗？ useCallback=(fn)=>{return fn()}
两个usecallback可以实现复用吗？
是的


useRequest 加一个缓存功能
这个缓存是要放到loaclStorage么？
hooks 是必须16.8 用么
16.8以下没这玩意
所有hook的依赖项都是钱比较吗 是的
仅仅通过lastDependencies确认两次callback是否一样，会不会某些场景有问题，比如两个callback不同，但是依赖项一样，不就没法调用第二次callback？
Object.is和==的区别是啥
Object.is和 == 是一样的吗?


