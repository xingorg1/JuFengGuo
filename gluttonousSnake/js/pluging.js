/*
 * @Author: @Guojufeng 
 * @Date: 2018-12-14 16:22:28 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-06-08 17:35:19
 */
var xingorg1Utils = {
  /* 记录最高分 */
  wls: {
    ls: window.localStorage,
    getItem(key) {
      try {
        return JSON.parse(this.ls.getItem(key))
      } catch (err) {
        return null
      }
    },
    setItem(key, val) {
      this.ls.setItem(key, JSON.stringify(val))
    },
    clear() {
      this.ls.clear()
    },
    keys() {
      return this.ls.keys()
    },
    removeItem(key) {
      this.ls.removeItem(key)
    }
  },
  /* 获取两对坐标差的平方和 */
  calLength2(x1, y1, x2, y2) {
    // pow：开平方，2是次数
    return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
  },
  /* 移动方向监测 */
  GetSlideDirection(startX, startY, endX, endY) {
    /* from https://www.cnblogs.com/yangmengsheng/p/5973487.html */
    //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
    var dy = startY - endY;
    var dx = endX - startX;
    var result = 0;
    //如果滑动距离太短
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
      return result;
    }
    var angle = this.GetSlideAngle(dx, dy);
    if (angle >= -45 && angle < 45) {
      result = 4;
    } else if (angle >= 45 && angle < 135) {
      result = 1;
    } else if (angle >= -135 && angle < -45) {
      result = 2;
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
      result = 3;
    }
    return result;
  },
  GetSlideAngle(dx, dy) {
    return Math.atan2(dy, dx) * 180 / Math.PI;
  },
  /* 设备检测 */
  isPhone: () => {
    /* from https://www.cnblogs.com/laq627/p/5848680.html */
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
      return true;
    } else {
      return false;
    }
  },
  /* 获取随机颜色值 */
  getRandomColor: () => {
    var color = '#',
      arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
    for (var i = 0; i < 6; i++) {
      var random = Math.floor(Math.random() * 16);
      color += arr[random];
    }
    return color;
  },
  getRedRandomColor: () => {
    // 生成红色范围的颜色值
    var color = '#ff',
      arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
    for (var i = 0; i < 4; i++) {
      var random = Math.floor(Math.random() * 16);
      color += arr[random];
    }
    return color;
  },
  /*
   * 添加事件
   * @param {variable} element 元素
   * @param {string} type 事件类型
   * @param {function} handler 回调函数
   */
  addHander: (element, type, handler) => {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, handler);
    } else {
      element['on' + type] = handler;
    }
  },
  /*
   * 移除事件
   * @param {variable} element 要移除事件的元素
   * @param {string} type 事件类型
   * @param {function} handler 回调函数
   */
  removeHander: (element, type, handler) => {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, handler);
    } else {
      element['on' + type] = handler;
    }
  },
  getEvent: (event) => {
    return event ? event : window.event;
  },
  /*
   * 获取事件的类型
   * @param {variable} event 
   */
  getType: (event) => {
    return event.type;
  },
  /*
   * 获取事件来自于哪个元素
   * @param {variable} event 
   */
  getElement: (event) => {
    return event.target || event.srcElement;
  },
  /*
   * 阻止、取消事件的默认行为|属性发生
   * @param {variable} event 
   */
  preventDefault: (event) => {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = null;
    }
  },
  /*
   * 阻止冒泡行为
   * @param {variable} event 
   */
  stopPropagation: (event) => {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  }
};