/**
 * forEach迭代，如果if里有return。只是退出本次迭代，但是后边的迭代还是会继续的。
 */
function diedai(){
  let arr = [1,2,3,4,5]
  arr.forEach((el) => {
  if(el == 3) {
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
function xunhuan(){
  let arr = [1,2,3,4,5]
  for(var i = 0; i < arr.length; i++) {
    if(arr[i] === 3) {
      return 'if里return，全部循环结束'
    }
    console.log(arr[i])
  }
  return '循环函数return'
}
console.log(xunhuan()) 