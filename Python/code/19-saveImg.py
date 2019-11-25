import requests
try:
    img = requests.get('https://res.pandateacher.com/2019-01-12-15-29-33.png')
    ws = open('myimg1.png','a+')
    ws.write(img.text)
    print(img.content)
except:
    print('图片下载失败')


# 保存图片到本地