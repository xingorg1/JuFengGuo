/*
 * @Author: @Guojufeng 
 * @Date: 2019-01-18 21:21:33 
 * @Last Modified by:   @Guojufeng 
 * @Last Modified time: 2019-01-18 21:21:33 
 */
function ajax(obj) {
  var xhr = (function () { //获取xhr对象，为了兼容ie6所以进行了重新封装
    if (typeof XMLHttpRequest != 'undefined') {
      return new XMLHttpRequest();
    } else if (typeof ActiveXObject != 'undefined') {
      var version = [
        'MSXML2.XMLHttp6.0',
        'MSXML2.XMLHttp3.0',
        'MSXML2.XMLHttp'
      ]
      for (var i in version) {
        try {
          return new ActiveXObject(version[i]);
          break;
        } catch (e) {
          //捕获错误进行然后跳出继续循环
        }
      }
    } else {
      throw new Error("您的系统或浏览器不支持XHR对象！");
    }
  })(); //获取xhr对象
  //默认true开启异步(异步和同步的主要区别是异步在请求的时候后面的脚本可以继续运行，同步的话必须运行完ajax然后才能运行其后面的脚本)
  if (obj.async === true) {
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        callback(xhr.responseText);
      }
    }
  }
  var arr = [];
  for (var i in obj.data) {
    arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj.data[i]));
  }
  obj.data = arr.join('&'); //这一步要注意一下，不管是get/post 方式提交都必须要对传进来的obj.data进行格式化 最后转化成的格式name=zhang&age=26&wedding=no
  if (obj.method === 'get') { //通过get方式请求的
    obj.url = obj.url.indexOf('?') == -1 ? obj.url + '?rand=' + Math.random() + '&' + obj.data : obj.url + 'rand=' + Math.random() + '&' + obj.data;
    xhr.open(obj.method, obj.url, obj.async);
    xhr.send(null);
  }
  if (obj.method === 'post') { //通过post方式请求的
    obj.url = obj.url + '?rand=' + Math.random();
    xhr.open(obj.method, obj.url, obj.async);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //这是对请求头部的类型重设，post的请求必须要重设;
    xhr.send(obj.data);
  }
  //false开启同步
  if (obj.async === false) {
    callback(xhr.responseText);
  }

  function callback(returnTxt) {
    if (xhr.status == 200) {
      obj.success(returnTxt);
    } else {
      alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
    }
  }
}