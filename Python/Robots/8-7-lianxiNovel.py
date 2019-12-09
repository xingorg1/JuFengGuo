# 小说催更
# 一、使用session和cookies模拟登录
import requests

# 创建会话。
session = requests.session()
# 添加请求头，避免被反爬虫。
headers = {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'
}

# 登录的网址。
url = ' https://wordpress-edu-3autumn.localprod.oc.forchange.cn/wp-login.php'
# 登录的参数。
data = {'log': input('请输入你的账号:'),
        'pwd': input('请输入你的密码:'),
        'wp-submit': '登录',
        'redirect_to': 'https://wordpress-edu-3autumn.localprod.oc.forchange.cn/wp-admin/',
        'testcookie': '1'}

#在会话下，用post发起登录请求。
session.post(url, headers=headers, data=data)

# 二、获取书籍id

# 提示1：

# 本步骤不需要模拟登录
# 网站的编码模式是gbk

# 提示2
link = 'https://www.xslou.com/yuedu/9356/'
# 字符串link过滤出数字id（9356）
id_list = list(filter(str.isdigit,link))
book_id = ''.join(book_id)
# 步骤解析：1、filter()过滤数字 2、filter对象转列表 3、列表转字符串 
# filter(str.isdigit,字符串) 
# 第一个参数用来判断字符串的单个元素是否是数字，数字保留
# filter()返回的是对象，需要用list()函数转换成列表
# ''.join(列表)将列表转换成字符串

# 提示3
# 爬取链接html页面中a标签的链接以及内容
import requests 
from bs4 import BeautifulSoup 
url = 'https://movie.douban.com/top250?start=25&filter='
results = requests.get(url)
results.encoding = 'utf-8'
bs = BeautifulSoup(results.text,'html.parser')
ols = bs.find('ol',class_='grid_view')
for ls in ols.find_all('li'):
    url_movie = ls.find('a')['href']
    url_text = ls.find('a').text

  
# 三、带cookies和参数请求催更链接
# 将上述两组代码组合。
# 拿到cookies和参数，完成催更请求（不要超过5次）
# 我帮你预置了前两个代码，你可以在此基础上完成本关卡任务。
# 注意：
# 请求url需要拼接书籍id
# 请求时候别忘了添加请求头和cookies:cookies=session.cookies

# 将上述两组代码组合。拿到cookies和参数，完成催更请求。
# 我帮你预置了前两个代码，你可以在此基础上完成本关卡任务。

# 小说楼：https://www.xslou.com/
# 小说楼登录：https://www.xslou.com/login.php
# 小说楼的排行榜：https://www.xslou.com/top/allvisit_1/
# 小说楼催更：https://www.xslou.com/modules/article/usercui.php?id=
import requests 
from bs4 import BeautifulSoup 

login_url = 'https://www.xslou.com/login.php'
hot_url = 'https://www.xslou.com/top/allvisit_1/'
urge_url = 'https://www.xslou.com/modules/article/usercui.php?id='
session = requests.session()  
headers = {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'
}

def login_cookies():
    data = {'username':input('请输入你的账号:'),
            'password':input('请输入你的密码:'),
            'action':'login'}
    result = session.post(login_url, headers=headers, data=data)

def get_bookids():
    result = requests.get(hot_url, headers=headers)
    result.encoding = 'gbk'
    bs = BeautifulSoup(result.text,'html.parser')
    uls = bs.find_all('span',class_='up2')
    books = {}
    for li in uls:
        book_name = li.find('a').text
        link = li.find('a')['href']
        id_list = list(filter(str.isdigit,link))
        book_id = ''.join(id_list)
        books[book_id] = book_name
    return books

def urge(book_id):
    # 请求催更链接需要拼接book_id
    # 请求需要带上headers和cookies

def main ():
    login_cookies()
    books = get_bookids()
    print('--------热门书籍--------')
    for k,v in books.items():
        print(k,':',v)
    book_id = input('请输入想要催更的书籍id：')
    urge(book_id)
main()
