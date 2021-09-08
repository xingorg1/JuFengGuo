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
/**
 * 深克隆（深拷贝）
 * @param {object} origin 
 * @returns origin / 克隆的origin
 */
function deepClone(origin) {
  let result = null;
  if (typeof origin === 'object' && origin !== null) {
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
  /* 
    问题：origin如果有循环应用，深克隆就会报错栈溢出
    let obj2 = {
      name: '循环应用测试'
    }
    obj2.cycle = obj2
    let objClone2 = deepClone(obj2); // 报错栈溢出 Uncaught RangeError: Maximum call stack size exceeded
   */
}
/**
 * 深克隆（深拷贝）+ 解决上边深拷贝函数中循环引用时导致的栈溢出的问题
 * @param {object} origin 
 * @param {*} hashMap WeakMap数据，用于缓存克隆过的对象，这里也可以尝试用WeakSet的写法
 * @returns origin / 克隆的origin
 */
function deepCloneCycle(origin, hashMap = new WeakMap()) {
  let result = null;
  if (hashMap.has(origin)) return hashMap.get(origin); // 查缓存字典中是否已有需要克隆的对象，有的话直接返回同一个对象（同一个引用，不用递归无限创建进而导致栈溢出了）
  if (typeof origin === 'object' && origin !== null) { // 【类型判断】引用类型，进行递归拷贝（用typeof判断类型要剔除null的情况）
    if (Object.prototype.toString.call(origin) === '[object Array]') {
      // 【类型判断】数组类型，创建一个新数组
      result = [];
      hashMap.set(origin, result); // 哈希表缓存新值
      // 【遍历赋值】
      origin.forEach(el => {
        result.push(deepCloneCycle(el, hashMap)); // 【递归】
      });
    } else {
      // 【类型判断】对象类型，创建一个新对象
      result = {};
      hashMap.set(origin, result); // 哈希表缓存新值
      for (const key in origin) {
        // 【遍历赋值】对象这里特殊处理了，不遍历拷贝原型链上的属性
        if (origin.hasOwnProperty(key)) {
          result[key] = deepCloneCycle(origin[key], hashMap); // 【递归】
        }
      }
    }
  } else { // 【类型判断】原始类型直接返回
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