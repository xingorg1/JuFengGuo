# coding=utf-8
import requests
from requests.cookies import RequestsCookieJar
# 接口地址处理：get请求 + 带参数 + 设置cookie
pageUrl = 'http://match.yuanrenxue.com'
loginUrl = 'http://match.yuanrenxue.com/api/login'
userRanking = 'http://match.yuanrenxue.com/api/useranking'
loginInfo = 'http://match.yuanrenxue.com/api/loginInfo'
apiUrl = 'http://match.yuanrenxue.com/api/match/2?page=1'
headers = {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Host': 'match.yuanrenxue.com',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36',
    'Connection': 'keep-alive',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cache-Control': 'max-age=0',
    'Referer': 'http://match.yuanrenxue.com/match/2',
    'X-Requested-With': 'XMLHttpRequest',
    'Cookie': 'Hm_lvt_9bcbda9cbf86757998a2339a0437208e=1603175826; tk=8794651336094457049; sessionid=stwxev4n51e1gi6f1znzsegowrd7rp0s; m=de94ceedebd220e76d293854fdecee60|1603180550000; qpfccr=true; Hm_lpvt_9bcbda9cbf86757998a2339a0437208e=1603180552'
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
# print(res.text.encode('utf-8').decode('unicode-escape'))

# ws = open('2-getJs.txt', 'a+')
# ws.write(res.text)
# ws.close()

# 2、使用session会话
session=requests.session()

# 使用session发送post请求进行登陆。 自动保存cookie信息并携带cookie信息
loginRes = session.post(loginUrl, data=loginData, headers=headers)
print(loginRes.text.encode('utf-8').decode('unicode-escape'))
print(loginRes.cookies)
print(loginRes.cookies.get_dict())
print(loginRes.headers)
userRes = session.post(userRanking, headers=headers)
print(userRes)
print(userRes.cookies)
 
# 使用session进行请求  (自动携带cookie信息,自动登陆)
logInfoRes = session.get(loginInfo, headers=headers)
print(logInfoRes.text.encode('utf-8').decode('unicode-escape'))
print(logInfoRes.cookies)
print(logInfoRes.headers)
# 获取接口地址
newCookie = ''
# apiRes = session.get(apiUrl, headers=headers, cookies=loginRes.cookies)
apiRes = session.get(apiUrl, headers=headers)
print(apiRes.text.encode('utf-8').decode('unicode-escape'))
print(apiRes.cookies.get_dict())
print(apiRes.headers)


# 保存页面
with open("02-getJs-result.txt","w",encoding="utf-8") as f:
    f.write(logInfoRes.content.decode('unicode-escape'))
    f.write(apiRes.content.decode('unicode-escape'))
