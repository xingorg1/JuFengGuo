import requests
session = requests.session()
#用requests.session()创建session对象，相当于创建了一个特定的会话，帮我们自动保持了cookies。
url = 'https://wordpress-edu-3autumn.localprod.oc.forchange.cn/wp-login.php'
headers = {
'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
}
data = {
    'log':input('请输入账号：'),
    'pwd':input('请输入密码：'),
    'wp-submit':'登录',
    'redirect_to':'https://wordpress-edu-3autumn.localprod.oc.forchange.cn/wp-admin/',
    'testcookie':'1'
}
session.post(url,headers=headers,data=data)
#在创建的session下用post发起登录请求，放入参数：请求登录的网址、请求头和登录参数。

print(type(session.cookies)) #打印cookies的类型,session.cookies就是登录的cookies
print(session.cookies)  #打印cookies

url_1 = 'https://wordpress-edu-3autumn.localprod.oc.forchange.cn/wp-comments-post.php'
data_1 = {
'comment': input('请输入你想要发表的评论：'),
'submit': '发表评论', 
'comment_post_ID': '13',
'comment_parent': '0'
}
comment = session.post(url_1,headers=headers,data=data_1)
#在创建的session下用post发起评论请求，放入参数：文章网址，请求头和评论参数，并赋值给comment。
print(comment)