/*
 * @Author: @Guojufeng 
 * @Date: 2019-06-26 22:25:30
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-06-26 22:35:48
 */
const {
  log
} = console;
// 深拷贝一套数据（后来不用了）
var mydata = {
  title: 'mvvm模拟',
  count: 1.0,
  info: {
    name: 'guo',
    study: {
      a: 'vue',
      b: 'react'
    }
  }
};
let copyData = deepClone(mydata);

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


// 原始思路 - 老师
// Observer(copyData)
function Observer(obj) {
  if (obj && typeof obj == 'object') {
    let arr = Object.keys(obj);
    log(arr)
    arr.forEach((el) => {
      defineProp(obj, el, obj[el]);
    })
  } else {
    return obj;
  }
}

function defineProp(data, key, val) {
  // log(data,key)
  Observer(val)
  Object.defineProperty(data, key, {
    get() {
      log('getter：' + val);
      return val;
    },
    set(value) {
      log('setter' + key + '，value' + value)
      if (value && value !== val) {
        val = value;
      }
    }
  });
}

// 整理 - 普通代理 - defineProperty应用
// ProxyData(copyData);
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

function define(copyData, key, val) {
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



/* Proxy代理 - 代理对象 */
// let newData = ProxyDealData(copyData)
function ProxyDealData(data) {
  log(data)
  let proxy = new Proxy(data, {
    get(target, key, proxy) {
      log('proxyGetter', target, key, proxy);
      // return target[key];
      return Reflect.get(target, key)
    },
    set(target, key, val, proxy) {
      // log('proxySetter',target,key,val,proxy)
      log('proxySetter')
      Reflect.set(target, key, val)
      // if(target[key] !== val){
      //   val = target[key]
      // }
    }
  });
  log(proxy);
  return proxy;
}
// log('====测试 - proxy====')
// log(newData)
// log(newData.title)
// log(newData.info.name)
// log(newData.info.study.a)
// newData.info.study.a = 'aaa';//缺点暴露：只能检测一层对象，深层的不行


/* Proxy 代理深层嵌套的对象 */

/* 数据模型
obj :{
  a:{
    b: 1
  }
} 
*/
// let newData = DeepProxyDealData(copyData)
function DeepProxyDealData(obj) {
  /* 递归代理 */
  // 思路，迭代对象，若发现key值是对象，则递归调用代理函数，将key的值传进去做代理
  for (const objKey in obj) {
    if (obj.hasOwnProperty(objKey)) {
      const el = obj[objKey];
      if (el && typeof el === 'object') { //非null时的object类型
        //拿到代理后的对象，赋值给val为对象的key
        obj[objKey] = DeepProxyDealData(el);
      }
    }
  }
  let proxy = new Proxy(obj, {
    get(target, key, proxy) {
      log('proxy-Getter', key)
      return Reflect.get(target, key)
    },
    set(target, key, val, proxy) {
      log('proxy-Setter', key)
      Reflect.set(target, key, val)
    }
  });
  log(proxy);
  return proxy; //递归的出口，返回代理后的对象
}
// log('====测试嵌套对象 - proxy====')
// // log(newData)
// log(newData.title)
// log(newData.info.name)
// log(newData.info.study.a)
// newData.info.study.a = 'aaa';//实现深层代理
// newData.info.study.c = 'ccc';//新增属性


/* Proxy 深层数组的代理 */
let deepArr = [
  [10, 11],
  ['a', [
    'guo',
    '小石头'
  ]]
];
// deepArrProxy(deepArr);
function deepArrProxy(data) {
  data.forEach((el, i) => {
    if (Object.prototype.toString.call(el) === '[object Array]') {
      data[i] = deepArrProxy(el);
    }
  })
  let proxy = new Proxy(data, {
    get(target, key, proxy) {
      log('Array-proxy-Getter', key)
      return Reflect.get(target, key)
    },
    set(target, key, val, proxy) {
      log('Array-proxy-Setter', key)
      Reflect.set(target, key, val)
    }
  });
  log(proxy);
  return proxy; //递归的出口，返回代理后的对象
}
// log('====测试嵌套数组 - proxy====')
// log('输出：',deepArr[1][1][1])


/* Proxy - 劫持深层数组 + 深层对象的混合体 */
let deepData = [{
    name: '嵌套对象',
    grandFa: {
      name: 'grandFa-name',
      father: {
        name: 'father-name',
        son: {
          name: 'son-name'
        }
      }
    }
  },
  [10, {
    name: 'guo',
    age: 20
  }],
  ['a', [
    'guo',
    '小石头'
  ]]
];
let deepDataRst = ProxyDeepData(deepData);

function ProxyDeepData(data) {
  let toStr = Object.prototype.toString,
    UnableProxy = {
      // 整理proxy不可以代理的数据类型，用于后期
      'string': true,
      'number': true,
      'boolean': true,
      'null': true,
      'undefined': true,
      'symbol': true
    };
  if (UnableProxy[typeof (data)]) {
    // 不能被代理的数据，直接返回。
    return data;
  }
  if (toStr.call(data) === '[object Array]') {
    data.forEach((el, i) => {
      data[i] = ProxyDeepData(el);
    })
  } else if (toStr.call(data) === '[object Object]') {
    // 这里可以后期考虑Set、Map数据的劫持,只需吧for..in改成用(for..of)迭代，那时就不考虑兼容性了。
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const el = data[key];
        data[key] = ProxyDeepData(el);
      }
    }
  }
  let proxy = new Proxy(data, {
    get(target, key) {
      log('深劫持-get', key);
      return Reflect.get(target, key)
    },
    set(target, key, val) {
      log('深劫持-set', key);
      Reflect.set(target, key, val)
    }
  })
  return proxy;
}
log('劫持数据：', deepDataRst)
log('深劫持数组结果：', deepDataRst[2][1][1])
log('深劫持对象结果：', deepDataRst[0].grandFa.father.son.name)
log('set结果：', deepDataRst[1][1].name = '小小小石头')


/* Set数据的迭代 */
// let a1a = new Set([1,2,3])
// for(var item of a1a){
//   console.log(item)
// }