// 函数化可扩展封装思想。
// var state = {
//   txt: txt.value,
//   sex: curBtn.innerText
// }
function combineFilter(config){
  return function(data){
    for (const key in config) {
      data = config[prop](data,state[prop]);
    }
  }
}
var lastFilter = combineFilter({
  txt: filterName,
  sex: filterSex
})