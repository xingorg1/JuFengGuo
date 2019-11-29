
# 思路二：我们分别提取所有的菜名、所有的URL、所有的食材。然后让菜名、URL、食材给一一对应起来（这并不复杂，第0个菜名，对应第0个URL，对应第0组食材，按顺序走即可）。
import requests
from bs4 import BeautifulSoup
baseUrl = 'http://www.xiachufang.com'
result = []
resultObj = {}
try:
  res = requests.get('http://www.xiachufang.com/explore/')
  res.raise_for_status()
  bs = BeautifulSoup(res.text, 'html.parser')
  cookList = bs.find_all('p',class_="name")
  ingredientList = bs.find_all('p',class_="ing ellipsis")
  for item in range(len(cookList)):
    # title = cookList[item].find('a').text.strip()
    title = cookList[item].text.strip() # 修正如下，直接内容就行，不用再寻找a标签了
    link = baseUrl + cookList[item].find('a')['href']
    ingre = ingredientList[item].text.strip()
    result.append([title,link,ingre])
    resultObj[title] = {
    	'链接：': link,
        '食材': ingre
    }
except:
  print('失败')
print(result)
print('===')
print(resultObj)


# 参考答案
# import requests
# # 引用requests库
# from bs4 import BeautifulSoup
# # 引用BeautifulSoup库

# res_foods = requests.get('http://www.xiachufang.com/explore/')
# # 获取数据
# bs_foods = BeautifulSoup(res_foods.text,'html.parser')
# # 解析数据

# tag_name = bs_foods.find_all('p',class_='name')
# # 查找包含菜名和URL的<p>标签
# tag_ingredients = bs_foods.find_all('p',class_='ing ellipsis')
# # 查找包含食材的<p>标签
# list_all = []
# # 创建一个空列表，用于存储信息
# for x in range(len(tag_name)):
# # 启动一个循环，次数等于菜名的数量
#     list_food = [tag_name[x].text[18:-14],tag_name[x].find('a')['href'],tag_ingredients[x].text[1:-1]]
#     # 提取信息，封装为列表。注意此处[18:-14]切片和之前不同，是因为此处使用的是<p>标签，而之前是<a>
#     list_all.append(list_food)
#     # 将信息添加进list_all
# print(list_all)
# # 打印