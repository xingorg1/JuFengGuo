# 滚动的banner
import os,time

# banner函数封装
def bannerFn(showTxt,timeOut):
  while True:
    os.system('clear')  # linux/os x系统；windows 系统中，这个命令是 os.system('cls')，效果：清屏。
    print(showTxt)
    showTxt = showTxt[1:] + showTxt[0] # 这行代码相当于：将字符串中第一个元素移到了最后一个。
    time.sleep(timeOut)

bannerFn('愿你三冬暖,愿你春不寒,愿你天黑有灯、下雨有伞,愿你善其身,愿你遇良人,暖色浮余生,有好人相伴~~',0.2)