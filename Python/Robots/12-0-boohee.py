# 根据薄荷网总结各种类食物的热量及详细信息。

# 导入所需的库和模块：
import csv
import bs4
import requests
import gevent
from gevent.queue import Queue
from gevent import monkey
monkey.patch_all()

work = Queue()
# 创建队列对象，并赋值给work。

# 前3个常见食物分类的前3页的食物记录的网址：
url_1 = 'http://www.boohee.com/food/group/{type}?page={page}'
for x in range(1, 4):
    for y in range(1, 4):
        real_url = url_1.format(type=x, page=y)
        work.put_nowait(real_url)
# 通过两个for循环，能设置分类的数字和页数的数字。
# 然后，把构造好的网址用put_nowait方法添加进队列里。

# 第11个常见食物分类的前3页的食物记录的网址：
url_2 = 'http://www.boohee.com/food/view_menu?page={page}'
for x in range(1, 4):
    real_url = url_2.format(page=x)
    work.put_nowait(real_url)
# 通过for循环，能设置第11个常见食物分类的食物的页数。
# 然后，把构造好的网址用put_nowait方法添加进队列里。

print(work)
# 打印队列


def crawler():
    # 定义crawler函数
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'
    }
    # 添加请求头
    while not work.empty():
        # 当队列不是空的时候，就执行下面的程序。
        url = work.get_nowait()
        # 用get_nowait()方法从队列里把刚刚放入的网址提取出来。
        res = requests.get(url, headers=headers)
        # 用requests.get获取网页源代码。
        bs_res = bs4.BeautifulSoup(res.text, 'html.parser')
        # 用BeautifulSoup解析网页源代码。
        foods = bs_res.find_all('li', class_='item clearfix')
        # 用find_all提取出<li class="item clearfix">标签的内容。
        for food in foods:
            # 遍历foods
            food_name = food.find_all('a')[1]['title']
            # 用find_all在<li class="item clearfix">标签下，提取出第2个<a>元素title属性的值，也就是食物名称。
            food_url = 'http://www.boohee.com' + food.find_all('a')[1]['href']
            # 用find_all在<li class="item clearfix">元素下，提取出第2个<a>元素href属性的值，跟'http://www.boohee.com'组合在一起，就是食物详情页的链接。
            food_calorie = food.find('p').text
            # 用find在<li class="item clearfix">标签下，提取<p>元素，再用text方法留下纯文本，也提取出了食物的热量。
            writer.writerow([food_name, food_calorie, food_url])
            print(food_name)
            # 打印食物的名称。
# 数据存储
site = '/Users/guojufeng/Documents/GitHub/JuFengGuo/Python/Robots/'
csv_file= open(site + '12-0-boohee.csv', 'w', newline='')
#调用open()函数打开csv文件，传入参数：文件名“boohee.csv”、写入模式“w”、newline=''。
writer = csv.writer(csv_file)
# 用csv.writer()函数创建一个writer对象。
writer.writerow(['食物', '热量', '链接'])
#借助writerow()函数往csv文件里写入文字：食物、热量、链接

# 最后，写出crawler函数和启动协程的代码，完成爬取数据的任务。
tasks_list = []
#创建空的任务列表
for x in range(5):
#相当于创建了5个爬虫
    task = gevent.spawn(crawler)
    #用gevent.spawn()函数创建执行crawler()函数的任务。
    tasks_list.append(task)
    #往任务列表添加任务。
gevent.joinall(tasks_list)
#用gevent.joinall方法，启动协程，执行任务列表里的所有任务，让爬虫开始爬取网站。