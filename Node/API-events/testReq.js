const MyRequest = require('./myRequest')

const request = new MyRequest('http://www.baidu.com')

request.send();

request.on('res', (headers, body) => {
  console.log(headers);
  console.log(body.slice(0, 350));
})