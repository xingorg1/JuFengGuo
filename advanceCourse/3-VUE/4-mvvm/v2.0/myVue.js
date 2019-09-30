/*
 * @Author: @Guojufeng 
 * @Date: 2019-06-24 00:21:57 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-06-26 18:03:35
 */
const {
  log
} = console;
// 深拷贝一套数据（后来不用了）
// let copyData = deepClone(data);

function deepClone(data) {
  // 复杂点的深度克隆
  let rst;
  if (data === null) {
    return data;
  }
  if (typeof data === 'object') {
    if (Object.prototype.toString.call(data) === '[object Object]') {
      rst = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          rst[key] = deepClone(data[key]);
        }
      }
    } else {
      // 数组
      rst = [];
      data.forEach(element => {
        rst.push(deepClone(element))
      });
    }
  } else {
    rst = data;
  }
  return rst;
}

// vm:将dom字符串中的变量名替换为数据值
function MyVue(el,data) {
  this.el = el;
  this.originEL = el.innerHTML;
  this.data = data;
  render({
    originEL: this.originEL,
    el: this.el,
    data: this.data
  });
  this.ProxyData(data);
}
MyVue.prototype.ProxyData = function(copyData){
  /* 监听数据变化 - 函数 */
  let _this = this;
  if (copyData && typeof copyData == 'object') {
    for (let key in copyData) {
      if (copyData.hasOwnProperty(key)) {
        let val = copyData[key];
        this.ProxyData(val);
        Object.defineProperty(copyData, key, {
          get() {
            log('getter：' + key);
            return val;
          },
          set(value) {
            log(`setter：${key}、value：${value}`)
            val = value;
            render({
              originEL: _this.originEL,
              el: _this.el,
              data: copyData
            });
          }
        });
      }
    }
  } else {
    return copyData;
  }
}

function render(params) {
  let str = params.originEL,
    reg = /{{(\w+)}}/g;
  // 用replace通过正则可以匹配到dom字符串中的大括号表示（e表示），有几个插值表达式replace执行几次。
  let rst = str.replace(reg, (e, $1) => {
    // log(e, $1);
    // 通过正则表达式的子表达式(\w+)这里，还能拿到双大括号内部的变量名（$1表示）。
    let rst = params.data[$1];
    return rst
  });
  // 替换后的字符串就是replace的返回值，用变量rst存储。
  params.el.innerHTML = rst;
}

// 代理 - 监听深拷贝后的数据
// ProxyData(copyData);
function ProxyData(copyData) {
  if (copyData && typeof copyData == 'object') {
    for (let key in copyData) {
      // debugger;
      let a = ProxyData(copyData[key]);
      log(a, copyData);
      if (copyData.hasOwnProperty(key)) {
        let val = copyData[key];//和之前老师封装的，就差这一句话。
        Object.defineProperty(copyData, key, {
          get() {
            log('getter：' + key);
            return val;
          },
          set(value) {
            log('setter' + key + '，value' + value)
            val = value;
          }
        });
      }
    }
  } else {
    return copyData;
  }
}
/* 
  // 整理
  ProxyData(copyData);
  function ProxyData(copyData) {
    if (copyData && typeof copyData == 'object') {
      for (let key in copyData) {
        // if (copyData.hasOwnProperty(key)) {}
        define(copyData, key, copyData[key])
      }
    } else {
      return copyData;
    }
  }
  function define(copyData, key,val) {
    ProxyData(copyData[key])
    Object.defineProperty(copyData, key, {
      get() {
        log('getter：' + key);
        return val;
      },
      set(value) {
        log('setter' + key + '，value' + value)
        val = value;
      }
    });
  }
*/

// Observer(copyData)
function Observer(obj){
  if (obj && typeof obj == 'object') {
    let arr = Object.keys(obj);
    log(arr)
    arr.forEach((el)=>{
      defineProp(obj,el,obj[el]);
    })
  } else {
    return obj;
  }
}
function defineProp(data,key,val){
  // log(data,key)
  Observer(val)
  Object.defineProperty(data, key, {
    get() {
      log('getter：' + val);
      return val;
    },
    set(value) {
      log('setter' + key + '，value' + value)
      if(value && value !== val){
        val = value;
      }
    }
  });
}
// log(copyData)
// log(copyData.title)
// log(copyData.info.name)
// log(copyData.info.study.a)