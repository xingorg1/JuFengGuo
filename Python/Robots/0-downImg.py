import requests
res = requests.get('https://res.pandateacher.com/2019-01-12-15-29-33.png')
# 发出请求，并把返回的结果放在变量res中
pic=res.content
# 把Reponse对象的内容以二进制数据的形式返回
photo = open('./spider.jpg','wb')
# 新建了一个文件spider.jpg，这里的文件没加路径，它会被保存在程序运行的当前目录下。
# 图片内容需要以二进制wb读写。你在学习open()函数时接触过它。
photo.write(pic)
# 获取pic的二进制内容
photo.close()
# 关闭文件