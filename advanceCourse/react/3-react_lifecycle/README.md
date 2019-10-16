## React生命周期

### V16之前
![生命周期流程图](https://github.com/xingorg1/JuFengGuo/raw/master/advanceCourse/react/3-react_lifecycle/src/assets/images/lifeCycle.png)

根据流程图打印的执行顺序图：s
![根据流程图打印的执行顺序图](https://github.com/xingorg1/JuFengGuo/raw/master/advanceCourse/react/3-react_lifecycle/src/assets/images/lifeCycleLog.png)
#### 初始化流程 - 
流程 | 详解 | 备注 
-- | -- | -- 
start	| 开始创建组件  | 
检查 | 	检查组件中是否有默认的属性、是否有属性校验 | 
constructor	| 开始执行constructor构造函数  | constructor是生命周期的一部分
componentWillMount |	执行componentWillMount生命周期函数。此时组件即将挂载到页面上。 | 类似vue的beforeMounte 
render |	执行render函数渲染页面。 |  
componentDidMount |	执行componentDidMount生命周期函数。此时组件已经被挂载到页面中。 | 类似vue的mounted 

#### 组间运行流程 - state值被改变
流程 | 详解 | 备注 
-- | -- | -- 
state被更改 |	组间运行中，state被更改 | 
进行提问<br/>是否继续？ |	触发shouldComponentUpdate函数。提问组件是否要进行更新。<br/>该函数接收两个参数：nextProps、nextStates。<br/>该函数需要返回布尔值来回答是否更新：<br/>&nbsp;&nbsp;&nbsp;&nbsp;return false不更改 - 流程回到state被更改前。<br/>&nbsp;&nbsp;&nbsp;&nbsp;return true进行更改 - state更改，流程继续。
  _ |【回答】：是 | 
componentWillUpdate |	执行conponentWillUpdate生命周期函数。告知组件即将开始进行更新。 | 
render |	组间更新完毕，执行render函数重新渲染页面。 | 
componentDidUpdate |	执行componentDidUpdate生命周期函数。告知组件更新并渲染完毕。此时更新过的组件已经渲染到页面中。 | 
  _ |【往复】：回到组件运行状态（等待） | 

#### 组间运行流程 - props改变，重新render
props属性是从父组件传过来的。当父组件改变了传递给子组件的数据时，子组件内部就会触发该函数。  
以下流程发生在子组件内部：子组件内部  

流程 | 详解 | 备注 
-- | -- | -- 
componentWillReceiveProps |	执行componentWillReciveProps生命周期函数。告知父组件改变了props的值。|  
 _ | 【循环】：重走state值被更改的流程如下：| 
state被更改 |	组间运行中，state被更改 | 
进行提问<br/>是否继续？ |	触发shouldComponentUpdate函数。提问组件是否要进行更新。<br/>该函数接收两个参数：nextProps、nextStates。<br/>该函数需要返回布尔值来回答是否更新：<br/>&nbsp;&nbsp;&nbsp;&nbsp;return false不更改 - 流程回到state被更改前。<br/>&nbsp;&nbsp;&nbsp;&nbsp;return true进行更改 - state更改，流程继续。
 _ |【回答】：是 |
componentWillUpdate |	执行conponentWillUpdate生命周期函数。告知组件即将开始进行更新。 | 
render |	组间更新完毕，执行render函数重新渲染页面。 | 
componentDidUpdate |	执行componentDidUpdate生命周期函数。告知组件更新并渲染完毕。此时更新过的组件已经渲染到页面中。 | 
 _ |【往复】：回到组件运行状态（等待） | 

#### 组间运行流程 - 组件被移除、销毁
流程 | 详解 | 备注 
-- | -- | -- 
componentWillUnmount |	执行componentWillUnmount生命周期函数。告知即将销毁组件。|
 _ |【销毁】：组件销毁完毕。|
