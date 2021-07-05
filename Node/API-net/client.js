var net = require('net');
var socket = net.connect(12306,'127.0.0.1');
console.log(111)
socket.on('connect',function(){
  console.log('已连接到服务器1')
})
socket.write('hi,服务器1')
socket.on('data',function(data){
  console.log(data);
})