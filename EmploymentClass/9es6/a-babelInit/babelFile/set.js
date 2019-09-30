"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _console = console,
    log = _console.log; // 初始化

var st = new Set();
var st1 = new Set([1, 2, 'e', 34, {
  name: 12
}]);
log(st1); // 原型方法使用

st1.add(2);
st1["delete"](2);
st1.has(2);
st1.forEach(function (val) {
  console.log(val);
});
st.clear(); // 应用

var ar1 = Array.from(st1);

var ar2 = _toConsumableArray(st1); // 数组中的扩展运算符


console.log(ar1, ar2);

var setToArr = _toConsumableArray(st1); // 数组中的扩展运算符


var str1 = 'string';

var strToArr = _toConsumableArray(str1);

console.log(strToArr, setToArr);
/**
 * @param {number[]} A
 * @param {number[][]} queries
 * @return {number[]}
 */

var sumEvenAfterQueries = function sumEvenAfterQueries(A, queries) {
  var rst = [];
  queries.forEach(function (el, i) {
    A[el[1]] += el[0];
    var tempRst = A.reduce(function (pre, cur) {
      if (cur % 2 == 0) {
        pre += cur;
      }

      return pre;
    }, 0);
    rst.push(tempRst);
  });
  return rst;
};
