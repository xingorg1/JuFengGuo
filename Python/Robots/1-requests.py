# 利用requests模块，从网上获取数据，解析、并存储到本地
import requests
try:
    res = requests.get('https://localprod.pandateacher.com/python-manuscript/crawler-html/exercise/HTTP%E5%93%8D%E5%BA%94%E7%8A%B6%E6%80%81%E7%A0%81.md')
    res.raise_for_status()
    print(res.text)
    ws = open('./JuFengGuo/Python/Robots/1-requests-http.txt', 'a+')
    ws.write(res.text)
    ws.close()
except:
    print('爬取《HTTP状态响应码》失败')
