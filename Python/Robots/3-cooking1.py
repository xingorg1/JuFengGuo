# 思路一：我们先去爬取所有的最小父级标签<div class="info pure-u">，然后针对每一个父级标签，想办法提取里面的菜名、URL、食材。
import requests
from bs4 import BeautifulSoup
baseUrl = 'http://www.xiachufang.com'
result = []
resultObj = {}
try:
  res = requests.get('http://www.xiachufang.com/explore/')
  res.raise_for_status()
  bs = BeautifulSoup(res.text, 'html.parser')
  cookList = bs.find('div',class_="normal-recipe-list").find_all('li')
  for cooks in cookList:
    cooksList = []
    cookBox = cooks.find('div',class_="info pure-u")
    cookA = cookBox.find('p', class_="name").find('a')
    title = cookA.text.strip()
    link = baseUrl + cookA['href']
    ingredients = cookBox.find('p', class_="ing ellipsis").find_all('span')
    # ingredient = cookBox.find('p', class_="ing ellipsis").text # 直接用text就可以打印出内容，没有标签的。
    ingreList = []
    cooksList.append(title)
    cooksList.append(link)
    for item in ingredients:   
      ingreList.append(item.text)
    cooksList.append(ingreList)
    print('====\r\n《%s》\r\n地址：%s\r\n食材：%s\r\n' %(title, link,ingreList))
    result.append(cooksList)
    resultObj[title] = {
      '地址': link,
      '食材': ','.join(ingreList)
    }
except:
  print('操作失败')

print('最后结果：',result)
print('对象格式：',resultObj)


# 第二种写法
# import requests
# from bs4 import BeautifulSoup
# baseUrl = 'http://www.xiachufang.com'
# result = []
# resultObj = {}
# try:
#   res = requests.get('http://www.xiachufang.com/explore/')
#   res.raise_for_status()
#   bs = BeautifulSoup(res.text, 'html.parser')
#   cookList = bs.find('div',class_="normal-recipe-list").find_all('li')
#   for cooks in cookList:
#     cooksList = []
#     cookBox = cooks.find('div',class_="info pure-u")
#     cookA = cookBox.find('p', class_="name").find('a')
#     title = cookA.text.strip()
#     link = baseUrl + cookA['href']
#     ingredient = cookBox.find('p', class_="ing ellipsis").text.strip() # 直接用text就可以打印出内容，没有标签的。
#     cooksList.append(title)
#     cooksList.append(link)
#     cooksList.append(ingredient.split('、'))
#     result.append(cooksList)
#     resultObj[title] = {
#       '地址': link,
#       '食材': ingredient
#     }
# except:
#   print('操作失败')

# print('最后结果：',result)
# print('对象格式：',resultObj)