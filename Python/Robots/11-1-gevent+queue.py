# 用协程技术和队列爬取8个网站的完整代码
from gevent import monkey
#从gevent库里导入monkey模块。
monkey.patch_all()
#monkey.patch_all()能把程序变成协作式运行，就是可以帮助程序实现异步。
import gevent,time,requests
#导入gevent、time、requests
from gevent.queue import Queue
#从gevent库里导入queue模块

start = time.time()

url_list = ['https://www.baidu.com/',
'https://www.sina.com.cn/',
'http://www.sohu.com/',
'https://www.qq.com/',
'https://www.163.com/',
'http://www.iqiyi.com/',
'https://www.tmall.com/',
'http://www.ifeng.com/']

work = Queue()
#创建队列对象，并赋值给work。
for url in url_list:
#遍历url_list
    work.put_nowait(url)
    #用put_nowait()函数可以把网址都放进队列里。

def crawler():
    while not work.empty():
    #当队列不是空的时候，就执行下面的程序。
        url = work.get_nowait()
        #用get_nowait()函数可以把队列里的网址都取出。
        r = requests.get(url)
        #用requests.get()函数抓取网址。
        print(url,work.qsize(),r.status_code)
        #打印网址、队列长度、抓取请求的状态码。

tasks_list  = [ ]
#创建空的任务列表
for x in range(2):
#相当于创建了2个爬虫
    task = gevent.spawn(crawler)
    #用gevent.spawn()函数创建执行crawler()函数的任务。
    tasks_list.append(task)
    #往任务列表添加任务。
gevent.joinall(tasks_list)
#用gevent.joinall方法，执行任务列表里的所有任务，就是让爬虫开始爬取网站。
end = time.time()
print(end-start)