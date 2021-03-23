const axios = require('axios');
const cheerio = require('cheerio');
async function getHtml() {
  let html = await axios.get('http://www.baidu.com')
  // console.log(html.data);
  return html.data
}
getHtml().then((html) => {
  const $ = cheerio.load(html);
  console.log($('.s-hotsearch-content').text());
})