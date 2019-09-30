/*
 * @Author: @Guojufeng 
 * @Date: 2019-06-08 13:56:17 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-06-08 13:59:21
 * 开个服务器本地测试用
 */
const express = require('express');
const app = new express();
app.use(express.static('./'));
app.listen('9310');