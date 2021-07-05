const axios = require('axios')
const cheerio = require('cheerio')
let movieUrl = ''
/* 1、axios获取电影信息 */
// function getMovie(url) {
//   /* 写法一 */
//   axios({
//     url,
//     type: 'get'
//   }) 
//   .then((response) => {
//     console.log(response)
//   })
// }
async function getMovie() {
  /* 写法二 */
  const resultData = await axios.get(movieUrl)
  return resultData.data
}

/* 2、cheerio处html文字信息 */
async function dealMovieInfo(url) {
  movieUrl = url
  const movieHtml = await getMovie() // 得到电影信息的网页html源代码
  const $ = cheerio.load(movieHtml)
  const movieList = $('div.article .indent table tbody tr')
  const movieInfoList = []
  for (let i = 0; i < movieList.length; i++) {
    const element = movieList[i];
    let movieName = $(element).find('div.pl2 a').text()
    movieName = movieName.split(' / ')[0] // 先取出名字以"/"切割的第一段
    movieName = movieName.replace(/\s/g, '') // 再去除空白字符
    const movieImgSrc = $(element).find('a.nbg img').attr('src')
    const movieInfo = $(element).find('p.pl').text().split(' / ')[0]
    movieInfoList.push({
      movieName,
      movieImgSrc,
      movieInfo
    })
  }
  return movieInfoList
}

/* 3、导出，供使用 */
module.exports = dealMovieInfo