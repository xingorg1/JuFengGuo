# 目标：把豆瓣TOP250里面的 序号/电影名/评分/推荐语/链接 都爬取下来，结果就是全部展示打印出来

# 首页 https://movie.douban.com/top250?start=0&filter=

# 一共10页，每页的url有什么相关呢？
# 第1页：https://movie.douban.com/top250?start=0&filter=
# 第3页：https://movie.douban.com/top250?start=50&filter=
# 第7页：https://movie.douban.com/top250?start=150&filter=

# 只有start后面是有变化哒，规律就是第N页，start=(N-1)*25

# 思路一：先爬取最小共同父级标签 <li>，然后针对每一个父级标签，提取里面的序号/电影名/评分/推荐语/链接。

import requests
import random
import bs4
movieDict = {}
try:
    for x in range(10):
      url = 'https://movie.douban.com/top250?start=' + str(x*25) + '&filter='
      headers = {
          "Host": "movie.douban.com",
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
      }
      res = requests.get(url, headers=headers)
      bs = bs4.BeautifulSoup(res.text, 'html.parser')
      movieList = bs.find('ol', class_="grid_view").find_all('li')
      for movie in movieList:
        num = movie.find('em', class_="").text  # 查找序号
        title = movie.find('span', class_="title").text  # 查找电影名
        tes = movie.find('span', class_="inq")
        if tes is None:
          tes = '无'
        else:
          tes = tes.text
        score = movie.find('span', class_="rating_num").text  # 查找评分
        url_movie = movie.find('a')['href']  # 查找地址
        movieDict[title] = {
            "id": num,
            "评分": score,
            "推荐语": tes,
            "地址": url_movie
        }
        print(num + '.' + title + '——' + score +
              '\n' + '推荐语：' + tes + '\n' + url_movie)
        print('====')
except:
    print('代码错误，操作失败')
print(movieDict)
