/*
 * @Author: @Guojufeng 
 * @Date: 2019-05-29 15:52:35 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-05-29 16:29:37
 * 工人先锋号~
 */
importScripts('./math.js');
this.onmessage = function(e){
  // console.log(window)
  /* let fs = require('fs');
  fs.readFile('./assets/demo.txt','utf-8',function(data){
    console.log(data);
  }); */
  console.log('math.js运行结果：',add(3,4))
  // 接收一个开始干活的命令，触发命令就开工。 
  console.log(e);//参数e得到一个事件，在事件里有个data存的就是postMessage传过来的参数。

  // 让工人先锋号来进行计算工作。
  var rst2 = 0;
  for (let i = 0; i < e.data.myNum; i++) {
    rst2 += i;
  }
  
  //工作完毕，就把工作结果（报告）提交上去。同主线程，用postMessage发送消息。
  this.postMessage({
    result: rst2
  });
}
