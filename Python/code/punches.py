# 剪刀石头布
import random

punches = ['石头','剪刀','布']
computer_choice = random.choice(punches)
user_choice = input('该你出拳头了，请输入石头、剪刀或布')
if user_choice in punches:
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
else:
  print('输入有误，请重新出拳')
