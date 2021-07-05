/*
 * @Author: @Guojufeng 
 * @Date: 2019-05-28 19:14:32 
 * @Last Modified by: guojufeng
 * @Last Modified time: 2020-05-21 14:45:19
 * 服务器文件
 */
var express = require('express');// 引入node的express

var app = new express();// 注册express，构建app对象。express默认访问index.html

app.use(express.static("./page"));// 设置一个静态文件的路径（当前文件夹下的page路径）

app.listen(9310, () => {
  console.log('服务启动成功')
});//9310为端口号。注意端口号尽量大于8000或者等于80，不写就是默认的80。 80是所有页面的默认端口
