# 豆瓣电影爬虫

## 使用方法：
```js
/* *
  简易爬虫应用
*/
const fs = require('fs')
/* 1、引入我们的spider.js */
const dealMovieInfo = require('./spiderMan')
console.log(dealMovieInfo)
/* 2、将获取的内容写到本地json文件中 */
async function saveMovieInfo() {
  let movieInfoList = await dealMovieInfo('https://movie.douban.com/chart') // 调用爬虫代码，传入要爬取的地址
  fs.writeFile('movieInfo.json', JSON.stringify(movieInfoList), (err) => {
    if (err) throw err
    console.log('文件已被保存') // 回调函数必须有
  })
}
/* 3、调用 */
saveMovieInfo()
 ```