# banner函数封装
def bannerFn(showNum,txtList,timeOut):
  import os,time
  bannerShowNum = 0
  while bannerShowNum < showNum:
    bannerShowNum+=1
    for i in txtList:
      os.system('clear')  # linux/os x系统；windows 系统中，这个命令是 os.system('cls')，效果：清屏。
      print(i)
      time.sleep(timeOut)

print('重要的事情说三遍：')
bannerFn(3,['愿你三冬暖','愿你春不寒','愿你天黑有灯、下雨有伞','愿你善其身','愿你遇良人','暖色浮余生','有好人相伴'],1)