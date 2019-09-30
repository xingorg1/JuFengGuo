/*
 * @Author: @Guojufeng 
 * @Date: 2019-04-08 20:35:10 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-04-08 21:06:31
 * 处理日期格式的代码（日期、时间处理的一些方法）
 * 1. timeStamp 	- 获取时间戳
 * 2. formatDate 	- 日期格式化
 * 3. formatWeek 	- 星期格式化
 * 4. zeroFill 		- 个位数补零
 * 5. lastDay     - 获取月份最大天
 * 6. compareDate	- 时间大小比较
 */
var xingorg1Time = {
  /*
   * 获取时间戳
   * @param {Object} date: new Date()对象
   */
  timeStamp: (date) => {
    return date.getTime();
  },

  /*
   * 日期格式化
   * @param {Object} date: new Date()对象
   * @param {String} fmt:  要处理成的时间格式
   */
  formatDate: (date, fmt) => {
    let o = {
      'm+': date.getMonth() + 1, //月份
      'd+': date.getDate(), //日
      'h+': date.getHours(), //小时
      'n+': date.getMinutes(), //分  
      's+': date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
      "i": date.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt)) { //年份
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : zeroFill(str));
      }
    }
    return fmt;
  },
  /*
   * 星期格式化
   * @param {Object} date: new Date()对象
   */
  formatWeek: (date) => {
    let day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    return day[date.getDay()];
  },
  /*
   * 个位数补零
   * @param {Number||String} num: 要处理的数字(可以是字符串格式)
   */
  zeroFill: (num) => {
    return ('00' + num).substr((num + '').length);
  },
  // 第二种方法
  addZero: function (str) {
    str += '';
    var reg = /^(\d)$/g;
    return str.replace(reg, '0$1');
  },
  /*
   * 获取月份最大天
   * @param {Number||String} year: new Date()对象得到的年份 || 自定义的年份数字
   * @param {Number||String} month: new Date()对象得到的月份 || 自定义的月份数字
   */
  lastDay: (year, month) => {
    let date = new Date();
    date.setFullYear(year, month);
    date.setDate(0);
    return date.getDate();
  },
  /*
   * 时间大小比较
   * @param {Number||String} year: new Date()对象得到的年份 || 自定义的年份数字
   * @param {Number||String} month: new Date()对象得到的月份 || 自定义的月份数字
   */
  compareDate: (d1, d2) => {
    return ((new Date(d1.replace(/-/g, "\/"))) > (new Date(d2.replace(/-/g, "\/"))));
  },
  /* 秒数格式化为时分秒
   * @Author: @Guojufeng 
   * @Date: 2019-04-08 20:58:01 
   * @Last Modified by: @Guojufeng
   * @Last Modified time: 2019-04-08 20:59:53
   */
  formatTime: function (timer) {
    var hour = 0, //时
      min = 0, //分
      sec = Math.ceil(timer); //秒
    if (sec > 60) {
      // 如果秒超过了60
      min = parseInt(timer / 60);
      sec = parseInt(timer % 60);
    }
    if (min > 60) {
      // 如果分超过了60
      hour = parseInt(min / 60);
      min = parseInt(min % 60);
    }
    return this.addZero(hour) + ':' + this.addZero(min) + ':' + this.addZero(sec);
  }


}