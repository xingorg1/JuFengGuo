# set
```js
/**
* Set a property on an object. Adds the new property and
* triggers change notification if the property doesn't
* already exist.
*/
export function set (target: Array<any> | Object, key: any, val: any): any {
  // 1、是开发环境，target没定义或者是基础类型则报错
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`)
  }
  // 2、如果是数组 Vue.set(array, 1, 100); 就调用重写的splice方法（以更新视图）
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  // 3、如果是对象本身的属性，则直接添加即可
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  // 4、如果是Vue实例 或 根数据data时，报错
  const ob = (target: any).__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    )
    return val
  }
  // 5、如果不是响应式的也不需要将其定义成响应式属性，则直接添加
  if (!ob) {
    target[key] = val
    return val
  }
  // 6、将属性定义成响应式的
  defineReactive(ob.value, key, val)
  // 7、手动通知视图更新
  ob.dep.notify()
  return val
}
```