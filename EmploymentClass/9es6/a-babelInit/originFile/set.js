const {log} = console;
// 初始化
let st = new Set();
let st1 = new Set([1,2,'e',34,{name: 12}]);

log(st1);

// 原型方法使用
st1.add(2);
st1.delete(2);
st1.has(2);
st1.forEach(val => {console.log(val)});
st.clear();

// 应用
var ar1 = Array.from(st1);
var ar2 = [...st1];// 数组中的扩展运算符
console.log(ar1,ar2);

let setToArr = [...st1];// 数组中的扩展运算符
let str1 = 'string';
let strToArr = [...str1];
console.log(strToArr,setToArr)


/**
 * @param {number[]} A
 * @param {number[][]} queries
 * @return {number[]}
 */
var sumEvenAfterQueries = function(A, queries) {
  var rst = [];
  queries.forEach((el,i)=>{
      A[el[1]] += el[0];
      var tempRst = A.reduce((pre,cur)=>{
          if(cur % 2 == 0){
              pre += cur;
          }
          return pre;
      },0);
      rst.push(tempRst);
  });
  return rst;
};