/* 
工具函数
 */

module.exports = {
  /* 打乱数组 */
  /* randomArr: (arr) => {
    return arr.sort(() => {
      return Math.random() - 0.5
    })
  } */
  randomArr: (arr) => arr.sort(() => Math.random() - 0.5), // es6写法
  /*  */

}