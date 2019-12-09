# 个人练习
import requests

url = ' https://wordpress-edu-3autumn.localprod.oc.forchange.cn/wp-login.php'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'
}
user = input('用户名：')
pwd = input('密码：')
data = {'log': user,  # 写入账户
        'pwd': pwd,  # 写入密码
        'wp-submit': '登录',
        'redirect_to': 'https://wordpress-edu-3autumn.localprod.oc.forchange.cn/wp-admin/',
        'testcookie': '1'}
res = requests.post(url, headers=headers, data=data)

cookies = res.cookies

commentURL = 'https://wordpress-edu-3autumn.localprod.oc.forchange.cn/wp-comments-post.php'
comment = input('评论语：')
commentData = {
  'comment': comment,
  'submit': '发表评论',
  'comment_post_ID': 15,
  'comment_parent': 0
}
commentRes = requests.post(commentURL, headers=headers, data=commentData,cookies=cookies)

print(commentRes.status_code)