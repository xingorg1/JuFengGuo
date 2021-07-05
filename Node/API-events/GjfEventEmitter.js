// 原理
// 内部维护多个事件队列（事件队列就是一个普通数组）
class GjfEventEmitter {
  on(eventName, callback) {
    // 注册事件
    this[eventName] = this[eventName] || []
    this[eventName].push(callback)
  }
  once(eventName, callback) {
    // 注册一次性事件
    callback.onceEvent = true
    this[eventName] = this[eventName] || []
    this[eventName].push(callback)
  }
  emit(eventName, ...args) {
    // 触发事件
    let newQuene = this[eventName] || []
    newQuene.map((cb, i) => {
      cb.apply(this, args)
      cb.onceEvent && newQuene.splice(i, 1)
    })
  }
  off(eventName, callback) {
    // 直接删除
    let newQuene = this[eventName] || []
    this[eventName] = newQuene.filter(cb => cb !== callback);
  }
  addListener(eventName, callback) {
    this.on(eventName, callback)
  }
  removeListener(eventName, callback) {
    this.off(eventName, callback)
  }
}

module.exports = GjfEventEmitter