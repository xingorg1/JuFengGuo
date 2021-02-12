let i = 0;

console.time('setImmediate');

function test() {
  if (i < 1000) {
    // setTimeout(test, 0) // 约1.334s
    setImmediate(test) // 约22.122ms
    i++
  } else {
    console.timeEnd('setImmediate');
  }
}

test();