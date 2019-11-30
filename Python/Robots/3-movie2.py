# 思路二：分别提取所有的序号/所有的电影名/所有的评分/所有的推荐语/所有的链接，然后再按顺序一一对应起来。

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
    movieList = bs.find('ol', class_="grid_view")
    num = movieList.find_all('em', class_="")  # 查找所有序号
    score = movieList.find_all('span', class_="rating_num")  # 查找所有评分
    title_box = movieList.find_all('div',class_="hd")  # 查找地址
    # 描述语比较特殊，有的没有这个标签，不好对应，所以找到一定有的父元素即可
    infoBox = movieList.find_all('div', class_="bd")
    for movieNum in range(len(title_box)):
      title = title_box[movieNum].find('span', class_="title").text  # 查找所有电影名
      url_movie = title_box[movieNum].find('a')['href']
      tes = infoBox[movieNum].find('span', class_="inq")
      if tes is None:
        tes = '无'
      else:
        tes = tes.text
      movieDict[title] = {
          "id": num[movieNum].text,
          "评分": score[movieNum].text,
          "推荐语": tes,
          "地址": url_movie
      }
      print(num[movieNum].text + '.' + title + '——' + score[movieNum].text +
            '\n' + '推荐语：' + tes + '\n' + url_movie)
      print('====')
except:
    print('代码错误，操作失败')
print(movieDict)
