const URL = require('url'),
    {
        log
    } = console
log(URL)
/* 
{
  Url: [Function: Url],
  parse: [Function: urlParse],
  resolve: [Function: urlResolve],
  resolveObject: [Function: urlResolveObject],
  format: [Function: urlFormat],
  URL: [class URL],
  URLSearchParams: [class URLSearchParams],
  domainToASCII: [Function: domainToASCII],
  domainToUnicode: [Function: domainToUnicode],
  pathToFileURL: [Function: pathToFileURL],
  fileURLToPath: [Function: fileURLToPath]
}
*/
log(URL === URL.URL) // false
const urlLink = 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash'
const myURL = new URL.URL(urlLink)
log(myURL)
/* 
URL {
  href: 'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash',
  origin: 'https://sub.example.com:8080',
  protocol: 'https:',
  username: 'user',
  password: 'pass',
  host: 'sub.example.com:8080',
  hostname: 'sub.example.com',
  port: '8080',
  pathname: '/p/a/t/h',
  search: '?query=string',
  searchParams: URLSearchParams { 'query' => 'string' },
  hash: '#hash'
}
*/

const UrlParseObj = URL.parse(urlLink) // 等于URL.URL()的写法，帮你调用构造函数
log(UrlParseObj)
/* 
Url {
  protocol: 'https:',
  slashes: true,
  auth: 'user:pass',
  host: 'sub.example.com:8080',
  port: '8080',
  hostname: 'sub.example.com',
  hash: '#hash',
  search: '?query=string',
  query: 'query=string',
  pathname: '/p/a/t/h',
  path: '/p/a/t/h?query=string',
  href:
   'https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash' }
 */



log('​将正规格式的url解析成一个对象: ','\n', URL.parse(urlLink))
log('​将parse的对象转换成一个正规格式的url: ', URL.format(myURL))

log(myURL.searchParams.has('query'))
log(myURL.searchParams['query']) // 获取不到内容
log(myURL.searchParams.sort())
