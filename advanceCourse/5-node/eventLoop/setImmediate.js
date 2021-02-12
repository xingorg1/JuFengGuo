setTimeout(() => {
  console.log('setTimeout');
}, 0)

setImmediate(() => {
  console.log('setImmediate');
})

// 二者输出顺序不定。因为setTimeout的定时器间隔取不到0，最小为1。
/**
可以看到多次运行，两句console.log打印的顺序不定。
这是因为setTimeout的间隔数最小填1，虽然下边代码填了0。但实际计算机执行当1ms算。
主线程运行的时候，setTimeout函数调用，计时器线程增加一个定时器任务。setImmediate函数调用后，其回调函数立即push到check队列。主线程执行完毕
eventloop判断时，发现timers和check队列有内容，进入异步轮询。等到了timers里这段时间，可能还没有1ms的时间，定时器任务条件不成立所以timers里还没有回调函数。继续向下到了check队列里，这时候setImmediate的回调函数早已等候多时，直接执行。而再下次eventloop，定时器也早已成熟，才会执行timers里的回调任务。于是顺序就是「setImmediate -> setTimeout」。
但也有可能到了timers阶段时，超过了1ms。于是计算定时器条件成立，setTimeout的回调函数被执行。eventloop再向下到达check队列执行setImmediate的回调后，顺序就是「setTimeout -> setImmediate」了。
 */