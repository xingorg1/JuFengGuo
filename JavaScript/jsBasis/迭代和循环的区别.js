/**
 * forEach迭代，如果if里有return。只是退出本次迭代，但是后边的迭代还是会继续的。
 */
function diedai() {
  let arr = [1, 2, 3, 4, 5]
  arr.forEach((el) => {
    if (el == 3) {
      return 'if里return，本次迭代结束'
    }
    console.log(el)
  })
  return '迭代函数return'
}
console.log(diedai())

/**
 * 循环，如果if里有return，直接结束循环
 */
function xunhuan() {
  let arr = [1, 2, 3, 4, 5]
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === 3) {
      return 'if里return，全部循环结束'
    }
    console.log(arr[i])
  }
  return '循环函数return'
}
console.log(xunhuan())

/* 
其实，这写return是退出当前函数体的。
如果单独把forEach和for循环写出来，里边再写return是会报错的
 */

for (let index = 0; index < arr.length; index++) {
  const element = arr[index];
  console.log(element);
  return false // Uncaught SyntaxError: Illegal return statement
  break // 这里就需要使用终止来结束语句了。（打断“连续性”）
}

arr.forEach((el) => {
  console.log(el)
  if (el === 'c') {
    break;
  }
})