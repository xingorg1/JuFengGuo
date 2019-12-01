import requests
import random
#调用requests模块，负责上传和下载数据

cookie = input('请输入网页的cookie值')
kuaidiType = input('请输入快递类型（拼音)')
kuaidiID = input('请输入快递单号')

url = 'https://www.kuaidi100.com/query?'
#使用get需要一个链接

header = {
'Accept-Encoding': 'gzip, deflate, br',
'referer': 'https://www.kuaidi100.com/',
'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
'Connection': 'keep-alive',
'Cookie': cookie,
'Host': 'www.kuaidi100.com',
'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
'X-Requested-With': 'XMLHttpRequest'
}
a = random.random()
params = {
          'type': kuaidiType,
          'postid': kuaidiID,
          'temp':str(a),
          'phone':''
          }
#将需要get的内容，以字典的形式记录在params内
r = requests.get(url, params=params,headers = header)
result = r.json()
print(result)
for i in result['data']:
    print(i['context'])
#记得观察preview里面的参数哦