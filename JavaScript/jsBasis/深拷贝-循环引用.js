/* 深拷贝、深克隆，循环引用 - weakMap */
function deepClone(origin, hashMap = new WeakMap()) {
  let result = null;
  if (hashMap.has(origin)) return hashMap.get(origin); // 查缓存字典中是否已有需要克隆的对象，有的话直接返回同一个对象（同一个引用，不用递归无限创建进而导致栈溢出了）
  if (typeof origin === 'object' && origin !== null) { // 【类型判断】引用类型，进行递归拷贝（用typeof判断类型要剔除null的情况）
    if (Object.prototype.toString.call(origin) === '[object Array]') {
      // 【类型判断】数组类型，创建一个新数组
      result = [];
      hashMap.set(origin, result); // 哈希表缓存新值
      // 【遍历赋值】
      origin.forEach(el => {
        result.push(deepClone(el, hashMap)); // 【递归】
      });
    } else {
      // 【类型判断】对象类型，创建一个新对象
      result = {};
      hashMap.set(origin, result); // 哈希表缓存新值
      for (const key in origin) {
        // 【遍历赋值】对象这里特殊处理了，不遍历拷贝原型链上的属性
        if (origin.hasOwnProperty(key)) {
          result[key] = deepClone(origin[key], hashMap); // 【递归】
        }
      }
    }
  } else { // 【类型判断】原始类型直接返回
    return origin;
  }
  return result;
}

// const set = new Set();
// a = 1
// set.add(a)
// b = {...a}
/* weakSet尝试失败 */
function deepCloneSet(origin, hashMap = new WeakSet()) {
  let result = null;
  if (hashMap.has(origin)) return hashMap.get(origin); 
  if (typeof origin === 'object' && origin !== null) {
    if (Object.prototype.toString.call(origin) === '[object Array]') {
      result = [];
      hashMap.add(origin, result);
      origin.forEach(el => {
        result.push(deepCloneSet(el, hashMap));
      });
    } else {
      result = {};
      hashMap.add(origin, result);
      for (const key in origin) {
        if (origin.hasOwnProperty(key)) {
          result[key] = deepCloneSet(origin[key], hashMap);
        }
      }
    }
  } else {
    return origin;
  }
  return result;
}

let obj2 = {
  name: '循环引用测试'
  // cycle: obj2
}
obj2.cycle = obj2