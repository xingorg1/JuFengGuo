/*
 * @Author: @Guojufeng 
 * @Date: 2019-05-22 16:09:22 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-05-22 19:07:35
 */
console.log(1);
let pr1 = new Promise((res, rej) => {
  console.log(2);
  var a = 1;
  console.log(++a, 'a');
  setTimeout(() => {
    res('res');
    // rej('rej');
    // throw '出错了！异步里边的错误then接收不到';
  }, 1000);
  // throw '出错了！同步错误被接收';
  return 'Promise返回值'
});
pr1
  .then((data) => {
    console.log(data);
    return 'then '
  },(err)=>{
    console.log('失败回调',err);
    // console.log('制造一个错误',noThisName)
    // throw '出错了！then里边显示抛出错误';
    return '失败回调返回值'
  })
  .then((data1) => {
    console.log(data1);
    return '链'
  },(err)=>{
    console.log('失败回调',err);
    return '失败回调返回值'
  })
  .then((data2) => {
    console.log(data2);
    return '式'
  })
  .then((data3) => {
    console.log(data3);
    return '调'
  })
  .then((data4) => {
    console.log(data4);
    return '用'
  })
  .then((data5) => {
    console.log(data5);
    return 'end'
  })
  .then((data6) => {
    console.log(data6);
    return 'return一个原始值'
  })
  .then((data7) => {
    console.log(data7);
    return {
      name: 'return一个引用值'
    }
  })
  .then((data8) => {
    console.log(data8);
    return new Promise((res2,rej2)=>{
      // rej2('promise - rej2的参数');
      rej2();//不传参
      res2('promise - res2的参数');
      return 'promise的返回值';
    })
  })
  .then((data9) => {
    console.log(data9);
  },(err9) => {
    console.log(err9);
    // 没有返回值
  })
  .then((data10) => {
    console.log(data10,'上一个then没有返回值');
  })
  .then(null,(catchErr)=>{
    // 错误捕获
  })
  .finally((final)=>{
    console.log('结束', final,'==================')
  });

let pr2 = new Promise((res,rej)=>{
  setTimeout(()=>{
    console.log('第2个promise');
    res('222');
  },1000);
});

let pr3 = new Promise((res,rej)=>{
  setTimeout(()=>{
    console.log('第3个promise');
    res('333');
  },2000);
});

let pr4 = new Promise((res,rej)=>{
  setTimeout(()=>{
    console.log('第4个promise');
    res('444');
    return 'setTimeout'
  },1040);
  return 'Promise'
});

Promise.all([pr2,pr3,pr4])
.then((suc)=>{
  console.log('all后边的then成功回调',suc);
},(err)=>{
  console.log('all后边的then失败回调',err);
});

/* Promise.race([pr2,pr3,pr4])//比赛，看谁先触发，不管触发的是res还是rej
.then((suc)=>{
  console.log('race后边的then成功回调',suc);
},(err)=>{
  console.log('race后边的then失败回调',err);
});
 */