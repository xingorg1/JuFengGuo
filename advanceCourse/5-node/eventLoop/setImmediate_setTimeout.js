let i = 0;

console.time('setImmediate');

function test() {
  if (i < 1000) {
    // setTimeout(test, 0)
    setImmediate(test)
    i++
  } else {
    console.timeEnd('setImmediate');
  }
}

test();