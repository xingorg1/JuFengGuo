import requests
from bs4 import BeautifulSoup

# 1、打印书籍目录
try:
  res = requests.get('http://books.toscrape.com/')
  res.raise_for_status()
  bs = BeautifulSoup(res.text,'html.parser')
  liList = bs.find('ul',class_="nav-list").find('li').find('ul').find_all('li')
  for item in liList:
    strCont = item.find('a').string.strip()
    print(strCont)
except:
  print('操作失败',res.status_code)

# 去除字符串空格
# 可以用strip或者replace函数来去掉空格就好哈
# 用replace(" ","")来去空格；或者strip函数，name = tag_a.text.strip() 


