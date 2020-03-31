// 线性数据存储结构 - 数组
// 数组的遍历
var arr = [1,2,3]
function ergodic(arr){
  if(arr && Array.isArray(arr)) { // 算法一定要容错！严谨性判断要求
    for (var i = 0; i < arr.length; i++) {
      console.log(arr[i])
    }
  }
}
ergodic(arr)

// 递归遍历
var arr2 = [31,41,11,111]
function diguiErgodic(arr,i){
  /* if(!arr || !Array.isArray(arr) || i >= arr.length){
    return false // 先写出口，不符合条件不递归
  }else {
    console.log(arr[i++])
    diguiErgodic(arr, i)
  } */
  // 第二种写法
  if(!arr || !Array.isArray(arr) || i >= arr.length) return false; // 先写出口，不符合条件不递归
  console.log(arr[i++])
  diguiErgodic(arr, i)
}
diguiErgodic(arr2, 0)