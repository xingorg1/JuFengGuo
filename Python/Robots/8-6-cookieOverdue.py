# cookie过期问题
import requests
import json
session = requests.session()
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'}


def cookies_read():
    cookies_txt = open('cookies.txt', 'r')
    cookies_dict = json.loads(cookies_txt.read())
    cookies = requests.utils.cookiejar_from_dict(cookies_dict)
    return (cookies)
    # 以上4行代码，是cookies读取。


def sign_in():
    url = ' https://wordpress-edu-3autumn.localprod.oc.forchange.cn/wp-login.php'
    data = {'log': input('请输入你的账号'),
            'pwd': input('请输入你的密码'),
            'wp-submit': '登录',
            'redirect_to': 'https://wordpress-edu-3autumn.localprod.oc.forchange.cn/wp-admin/',
            'testcookie': '1'}
    session.post(url, headers=headers, data=data)
    cookies_dict = requests.utils.dict_from_cookiejar(session.cookies)
    cookies_str = json.dumps(cookies_dict)
    f = open('cookies.txt', 'w')
    f.write(cookies_str)
    f.close()
    # 以上5行代码，是cookies存储。


def write_message():
    url_2 = 'https://wordpress-edu-3autumn.localprod.oc.forchange.cn/wp-comments-post.php'
    data_2 = {
        'comment': input('请输入你要发表的评论：'),
        'submit': '发表评论',
        'comment_post_ID': '13',
        'comment_parent': '0'
    }
    return (session.post(url_2, headers=headers, data=data_2))
    # 以上9行代码，是发表评论。


try:
    session.cookies = cookies_read()
except FileNotFoundError:
    sign_in()
    session.cookies = cookies_read()

num = write_message()
if num.status_code == 200:
    print('成功啦！')
else:
  # 如果cookies过期，就重新获取新的cookies。
    sign_in()
    session.cookies = cookies_read()
    num = write_message()
