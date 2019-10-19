#你和电脑已经对自己要出的拳进行了选择，接下来，我们需要知道双方的出拳类型。
#请使用print()函数补充亮拳的结果。
import random

# 出拳
punches = ['石头','剪刀','布']
computer_choice = random.choice(punches)
user_choice = ''
user_choice = input('请出拳：（石头、剪刀、布）')  # 请用户输入选择
# if user_choice in punches:
while user_choice not in punches:  # 当用户输入错误，提示错误，重新输入
    print('输入有误，请重新出拳')
    user_choice = input('输入有误，请重新出拳')

# 亮拳
print('————战斗过程————')
print('电脑出拳：%s' % (computer_choice))
print('你出拳：%s' % (user_choice))
# 胜负
print('—————结果—————')
if computer_choice == '石头':
  if user_choice == '石头':
    print('平局')
  elif user_choice == '剪刀':
    print('你输了')
  elif user_choice == '布':
    print('你赢了')
elif computer_choice == '剪刀':
  if user_choice == '石头':
    print('你赢了')
  elif user_choice == '剪刀':
    print('平局')
  elif user_choice == '布':
    print('你输了')
elif computer_choice == '布':
  if user_choice == '石头':
    print('你输了')
  elif user_choice == '剪刀':
    print('你赢了')
  elif user_choice == '布':
    print('平局')

# 参考部分代码
# print('—————结果—————')
# if user_choice == computer_choice:  # 使用if进行条件判断
#     print('平局！')
# elif (user_choice == '石头' and computer_choice == '剪刀') or (user_choice == '剪刀' and computer_choice == '布') or (user_choice == '布' and computer_choice == '石头'):
#     print('你赢了！')
# else:
#     print('你输了！')