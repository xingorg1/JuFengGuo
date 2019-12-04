# 下载电影吧٩̋(๑˃́ꇴ˂̀๑)
# 实现功能：用户输入喜欢的电影名字，程序即可在电影天堂https://www.ygdy8.com爬取电影所对应的下载链接，并将下载链接打印出来。
import requests
from bs4 import BeautifulSoup
from urllib.request import quote
#quote()函数，可以帮我们把内容转为标准的url格式，作为网址的一部分打开

movieName = input('请输入电影的名字：')
movieGBK = movieName.encode('gbk')
movieQuote = quote(movieGBK)
hostUrl = 'https://www.ygdy8.com/'
url = 'http://s.ygdy8.com/plus/s0.php?typeid=1&keyword='
print('搜索地址：',url+movieQuote)
print('查找中...')
res = requests.get(url + movieQuote)
bs = BeautifulSoup(res.text,'html.parser')
movieBox = bs.find('div',class_="co_content8")
if movieBox is None:
  print('没有搜素结果，请换一个电影吧～')
else:
  movieUrl = movieBox.find('a')['href']
  print('查找到下载页面，继续查找下载地址...')
  res2 = requests.get(hostUrl+movieUrl)
  res2.encoding = 'gbk' # 解决乱码
  bs2 = BeautifulSoup(res2.text,'html.parser')
  if not (bs2 is None):
      downBox = bs2.find('div',id="Zoom")
      if not (downBox is None):
        downBox = downBox.find('table').find('a')
      if downBox is None:
        print('没有搜素结果,请核对名字是否输入正确！')
      else:
        print('下载地址为：',downBox.text)
  else:
    print('没有结果')