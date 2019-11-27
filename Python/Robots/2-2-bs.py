import requests
from bs4 import BeautifulSoup

# 2、所有书的书名、评分、价格三种信息
scorelist = ['','One','Two','Three','Four','Five']

try:
  res = requests.get('http://books.toscrape.com/')
  res.raise_for_status()
  bs = BeautifulSoup(res.text,'html.parser')
  bookList = bs.find('ol',class_="row").find_all('li')
  for book in bookList:
    scoreCls = book.find('p',class_="star-rating")['class'][1]
    bookTitle = book.find('h3').find('a')['title']
    bookPrice = book.find('div',class_="product_price").find('p',class_="price_color").text
    print('《%s》\r\n评分：%s分\r\n价格：%s\r\n===\r\n' %(bookTitle,scorelist.index(scoreCls),bookPrice.replace('Â£','￥')))
except:
  print('操作失败','呜呜┭┮﹏┭┮',book)

# 获取list特定元素的下标
# mylist = [1,'One','Two','Three','Four','Five','Four']
# mylist.index('One')
# let enumerateObj = enumerate(mylist)
# print([i for i,x in enumerateObj if x == 'Four'])