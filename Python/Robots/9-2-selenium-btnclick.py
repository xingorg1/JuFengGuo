
# 自动点击按钮获取更多精彩评论，然后拔取前30条数据
# 思路，还可以根据精彩评论的总条数，循环点击的次数，然后拔去所有的评论
from selenium import webdriver
import time
import re # 正则
import math
import csv
site = '/Users/guojufeng/Documents/GitHub/JuFengGuo/Python/Robots/'

# 先创建一个csv文件
writeObj = open(site + '9-2-qq音乐《甜甜的》精彩评论爬取.csv','w',newline="",encoding="utf-8")
writer = csv.writer(writeObj) # 创建一个writer对象
writer.writerow(['序号','评语','点赞数'])

# 创建driver浏览器对象
driver = webdriver.Chrome()
driver.get('https://y.qq.com/n/yqq/song/000xdZuV2LcQ19.html') # 访问页面
time.sleep(15)
commentsNumBox = driver.find_element_by_class_name('mod_hot_comment').find_element_by_tag_name('h2').text
print('====',commentsNumBox)
numList = re.findall("\d+",commentsNumBox)
print(numList,'需要点击次数：',int(numList[0]) / 15)
clickNumber = math.floor(int(numList[0]) / 15)

# 按钮点击，加载所有精彩评论
btns = driver.find_element_by_class_name('js_get_more_hot')
print('按钮',btns)
for i in range(clickNumber):
  print('点击',i)
  btns.click()
  time.sleep(5)
print('点击完毕')

# 获取并存储精彩评论
time.sleep(15)
comments = driver.find_element_by_class_name('js_hot_list').find_elements_by_class_name('js_cmt_li') # 使用class_name找到评论
print(len(comments)) # 打印获取到的评论个数
for index in range(len(comments)): # 循环
    sweet = comments[index].find_element_by_tag_name('p') # 找到评论
    zan = comments[index].find_element_by_class_name('js_praise_num') # 找到评论
    print (index+1,'评论：%s\n ---点赞数：%s\n'%(sweet.text,zan.text)) # 打印评论
    writer.writerow([index+1,sweet.text,zan.text])

#  最后，必要的收尾
driver.close() # 关闭浏览器
writeObj.close() # open的文件需要关闭，with的写法除外。
