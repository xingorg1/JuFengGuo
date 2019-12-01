import csv # python自带，不用安装

writeFile = open('6-2-csvWrite.csv','w',newline='',encoding='utf-8')
# w 写；w+ 读写；r 读；r+ 读写；a 追加；a+ 追加且可读

writer = csv.writer(writeFile) # 创建一个writer对象

writer.writerow(['姓名','年龄','性别'])

writer.writerow(['章三','12','男'])
writer.writerow(['里斯','23','女'])
writer.writerow(['王武','22','男'])

writeFile.close()
