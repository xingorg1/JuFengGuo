/*
 * @Author: @Guojufeng 
 * @Date: 2019-01-13 12:14:59 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-01-14 16:42:21
 */
// ajax获取数据源
console.log(origin);
var btns = document.getElementById('btns'),
  btn = document.getElementsByClassName('btn'),
  curBtn = btn[2],
  btnArr = Array.prototype.slice.call(btn),
  txt = document.getElementById('txt');
var state = {
  txt: txt.value,
  sex: curBtn.innerText
}
// 数据渲染
function renderDom(arr) {
  var ul = document.getElementById('list');
  var str = arr.reduce((prev, el) => {
    prev += '<li class="item"><div class = "head" ><img src = "' + el.userHead + '" alt = "" ></div> <div class = "info" ><div class = "name" > ' + el.name + '</div> <div class = "word" >' + el.word + ' </div> </div> </li>'
    return prev;
  }, '');
  ul.innerHTML = str;
}
renderDom(origin);
// 行为交互
/* 深克隆 */
function deepClone(origin) {
  var type = typeof (origin),
    result = null;
  if (type === 'object' && origin !== null) {
    if (Object.prototype.toString.call(origin) === '[object Array]') {
      result = [];
      origin.forEach(el => {
        result.push(deepClone(el));
      });
    } else {
      result = {};
      for (const key in origin) {
        if (origin.hasOwnProperty(key)) {
          result[key] = deepClone(origin[key]);
        }
      }
    }
  } else {
    return origin;
  }
  return result;
}
/* 节流 */
function throttle(fn, wait) {
  var lastTime = 0;
  return function () {
    var now = new Date().getTime(),
      self = this,
      _args = arguments;
    if (now - lastTime > wait) {
      fn.apply(self, _args);
      lastTime = now;
    }
  }
}
/* 防抖 */
function debounce(fn, delay) {
  var timer = null;
  return function (e) {
    // console.log(e)
    var self = this,
      _args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(self, _args)
    }, delay);
  }
}

// click
// btns.addEventListener('click', throttle(chooseSex, 350), false);
for (let i = 0; i < btn.length; i++) {
  btn[i].onclick = throttle(chooseSex, 350);
}
// input
txt.onkeyup = debounce(filterOrigin, 1000);

function chooseSex(e) {
  // 覆盖
  // 行为交互 - 添加类名
  btnArr.forEach((el, i) => {
    btn[i].className = 'btn';
  })
  this.className += ' active';
  curBtn = e.target;
  filterOrigin();
}

function filterOrigin() {
  /* 重难点，怎么解耦？
  点击事件和数据渲染耦合严重， 对于后期想用input + select时不利
  select的时候还要获取input内部的值，同理，input的时候，还要检查select的值。
  比如输入“郭”，得到四个人，然后再选择Female，选择女性。最后只筛选出我自己。
  */
  var value = txt.value,
    result = origin;
  // console.log(value)
  if (value) {
    result = filterName(value, origin);
  }
  result = filterSex(result);
  console.log(result);
  renderDom(result);
}

function filterSex(arr) {
  // 数据渲染
  var clsName = curBtn.innerText;
  // console.log(clsName);
  var result = [];
  arr.forEach(el => {
    if (clsName === 'All') {
      result.push(deepClone(el));
    } else if (clsName === el.sex) {
      result.push(deepClone(el));
    }
  });
  return result;
}

function filterName(name, arr) {
  // 数据渲染
  var result = arr.reduce((prev, el) => {
    if (el.name.indexOf(name) > -1)
      prev.push(deepClone(el));
    return prev;
  }, []);
  return result;
}