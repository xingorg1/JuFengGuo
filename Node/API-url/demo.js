// 不用引入URL居然就有了？！
console.log(URL)
const myURL = new URL('https://example.org:81/foo');
console.log(myURL);
console.log(myURL.hostname);
// Prints example.org

// Setting the hostname does not change the port
myURL.hostname = 'example.com:82';
console.log(myURL.href);