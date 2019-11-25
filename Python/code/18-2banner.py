# 模拟滚动广告
import os,time
print(os,time)

bannerList = ['愿你一切都好','再无其他','小石头']

num = 0

while num < 2:
  num += 1
  for i in range(3): 
    os.system('clear') # linux/os x系统；windows 系统中，这个命令是 os.system('cls')，效果：清屏。
    print(bannerList[i])
    time.sleep(1) # 延迟
