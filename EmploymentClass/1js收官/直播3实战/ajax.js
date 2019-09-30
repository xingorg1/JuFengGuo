/*
 * @Author: @Guojufeng 
 * @Date: 2019-01-18 21:13:27 
 * @Last Modified by:   @Guojufeng 
 * @Last Modified time: 2019-01-18 21:13:27 
 */
/**   
 * 执行基本ajax请求,返回XMLHttpRequest   
 *  Ajax.request({   
 *  url
 *  async 是否异步 true(默认)  
 *  method 请求方式 POST or GET(默认)  
 *  data 请求参数 (键值对字符串)  
 *  success 请求成功后响应函数，参数为xhr  
 *  error 请求失败后响应函数，参数为xhr  
 *  });   
 */
Ajax = function () {
  function request(opt) {
    function fn() {}
    var url = opt.url || "";
    var async = opt.async !== false, method = opt.method || 'GET', data = opt.data ||
      null, success = opt.success || fn, error = opt.failure ||
      fn;
    method = method.toUpperCase();
    if (method == 'GET' && data) {
      var args = "";
      if (typeof data == 'string') {
        //alert("string")
        args = data;
      } else if (typeof data == 'object') {
        //alert("object")
        var arr = new Array();
        for (var k in data) {
          var v = data[k];
          arr.push(k + "=" + v);
        }
        args = arr.join("&");
      }
      url += (url.indexOf('?') == -1 ? '?' : '&') + args;
      data = null;
    }
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() :
      new ActiveXObject('Microsoft.XMLHTTP');
    xhr.onreadystatechange = function () {
      _onStateChange(xhr, success, error);
    };
    xhr.open(method, url, async);
    if (method == 'POST') {
      xhr.setRequestHeader('Content-type',
        'application/x-www-form-urlencoded;');
    }
    xhr.send(data);
    return xhr;
  }

  function _onStateChange(xhr, success, failure) {
    if (xhr.readyState == 4) {
      var s = xhr.status;
      if (s >= 200 && s < 300) {
        success(xhr);
      } else {
        failure(xhr);
      }
    } else {}
  }
  return {
    request: request
  };
}();
// -- -- -- -- -- -- -- -- -- -- -
// 作者： 云淡风清 - 北京
// 来源： CSDN
// 原文： https: //blog.csdn.net/luqin1988/article/details/8212379 
//   版权声明： 本文为博主原创文章， 转载请附上博文链接！