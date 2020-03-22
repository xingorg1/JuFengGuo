# 18-1帮你做选择
import random
menuList = ['秦唐','永和','米线','重庆','鱼公主','新奥',]
while True:
  print('今天去吃%s好不好？' %(menuList[random.randint(0,5)]))
  result = input('好还是不好？请输入y或者n：')
  if result == 'y':
    print('你真是一个乖巧懂事的小仙女～')
    break
  print('好吧，我再想一个...')


# 示例代码 
# # 帮你做选择之我要吃什么
# import random

# # 将需要用到的表格和变量放在开头
# list_food = ['KFC', '蒸菜馆', '楼下快餐店', '桂林米粉', '东北饺子', '金牌猪脚饭', '三及第汤饭']  # 备选菜单，可自定义。
# list_choice = []

# # 由于两个原因都包含判断过程，所以，为了让代码更简洁，可将其封装成函数。
# def choose(list):
#     while True:
#         food = random.choice(list)
#         judgement = input('去吃【%s】好不好啊？同意的话输入y，不想吃直接回车即可。'%(food))
#         if judgement == 'y':
#             print('去吃【%s】！就这么愉快地决定啦！'%(food)) 
#             break

# # 判断环节
# reason = int(input('你不知道吃什么的原因是：1.完全不知道吃什么；2.在几家店之间徘徊（请输入1或2）：'))
# if reason == 1:
#     choose(list_food)
# elif reason == 2:
#     add = True
#     while add:
#         choice = input('请输入让你犹豫的店名（注：一家一家输，完成后输入y）：')
#         if choice != 'y':  # 这个判断语句，是为了不将 y 也添加到菜单里。
#             list_choice.append(choice)
#         if choice == 'y':
#             add = False
#     choose(list_choice)          
# else:
#     print('抱歉，目前还不支持第三种情况——不过，你可以加代码哦。')



# - 总结：思路都对，人家的更完善，多一道功能。另外，上边的input可以优化为：输入y表示确定结束循环，输入其他或直接回车表示非y的情况