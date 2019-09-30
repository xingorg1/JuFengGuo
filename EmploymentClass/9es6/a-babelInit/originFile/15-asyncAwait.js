// 回到这个阶段 - 使用promise解决多个异步问题。但是还是有回调地狱

async function read() {
  let val = null;
  try {
    val = await setTimeout(()=>{return 1},1000);
    return val;
  } catch (e) {
    console.log('async的错误捕获', e)
  }
}