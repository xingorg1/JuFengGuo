# coding=utf-8
import requests
from requests.cookies import RequestsCookieJar
# 接口地址处理：get请求 + 带参数 + 设置cookie
pageUrl = 'http://match.yuanrenxue.com'
loginUrl = 'http://match.yuanrenxue.com/api/login'
loginInfo = 'http://match.yuanrenxue.com/api/loginInfo'
apiUrl = 'http://match.yuanrenxue.com/api/match/2?page=1'
headers = {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Host': 'match.yuanrenxue.com',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36',
    'Referer': 'http://match.yuanrenxue.com/match/2',
    'X-Requested-With': 'XMLHttpRequest'
}
loginData = {
  'username': 'yaogetxu',
  'password': 'Yaogetxu123'
}
# 1、普通形式
# resLogin = requests.post(loginUrl, data=loginData, headers=headers)
# print(resLogin.cookies)

# resLoginInfo = requests.get(loginInfo, cookies=resLogin.cookies, headers=headers)
# print(resLoginInfo, resLoginInfo.text)

# res = requests.get(apiUrl, cookies=resLogin.cookies, headers=headers)
# print(resLogin.cookies)

# print(res.text.encode('utf-8').decode('unicode-escape'))
# # print(json.loads())

# ws = open('2-getJs.txt', 'a+')
# ws.write(res.text)
# ws.close()

# 2、使用session会话
session=requests.session()

# 使用session发送post请求进行登陆。 自动保存cookie信息并携带cookie信息
session.post(loginUrl, data=loginData, headers=headers)
 
# 使用session进行请求  (自动携带cookie信息,自动登陆)
r = session.get(loginInfo, headers=headers)

# 获取接口地址
res = session.get(apiUrl, headers=headers)
print(res.text.encode('utf-8').decode('unicode-escape'))


# 保存页面
with open("02-getJs-result.txt","w",encoding="utf-8") as f:
    f.write(r.content.decode('unicode-escape'))
    f.write(res.content.decode('unicode-escape'))
