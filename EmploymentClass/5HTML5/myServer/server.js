/*
 * @Author: @Guojufeng 
 * @Date: 2019-05-28 19:14:32 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-05-28 19:46:37
 * 服务器文件
 */
var express = require('express');// 引入node的express

var app = new express();// 注册express，构建app对象。express默认访问index.html

app.use(express.static("./page"));// 设置一个静态文件的路径（当前文件夹下的page路径）

app.listen(9310);//9310为端口号。注意端口号尽量大于8000或者等于80，不写就是默认的80。 80是所有页面的默认端口
