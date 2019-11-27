# 四篇文章标题、发布时间、文章链接，
import requests
from bs4 import BeautifulSoup

try:
  res = requests.get('https://wordpress-edu-3autumn.localprod.oc.forchange.cn/')
  res.raise_for_status()
  bs = BeautifulSoup(res.text,'html.parser')
  articles = bs.find_all('article')
  for arti in articles:
    head = arti.find('header')
    time = head.find('time',class_="entry-date published").text
    titleTag = head.find('h2',class_="entry-title").find('a')
    title = titleTag.text
    link = titleTag['href']
    print('《%s》,发布于%s\r\n传送门：%s' %(title,time,link))
except:
  print('打印失败')
