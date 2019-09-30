import jquery from 'jquery';
import lodash from 'lodash-es'

console.log(jquery)
var addFun = function(a,b){
  console.log('addFun');
  return a + b;
}
var muiltFun = function(a,b){
  console.log('muiltFun');
  return a - b;
}

export {
  addFun,
  muiltFun
}