console.log('我是worker文件')
this.onmessage = function(e){
  let arr = []
  for (let i = 0; i < e.data.maxNum; i++) {
    arr.push(i)
    // console.log('****',i)
  }
  console.log(arr.length, 'worker执行完毕，哈哈哈')
  this.postMessage({
    result: arr.length
  });
}
