import random

# 出拳
punches = ['石头','剪刀','布']
computer_choice = random.choice(punches)
user_choice = ''
user_choice = input('请出拳：（石头、剪刀、布）')  # 请用户输入选择
while user_choice not in punches:  # 当用户输入错误，提示错误，重新输入
    print('输入有误，请重新出拳')
    user_choice = input()

# 亮拳
print('————战斗过程————')
print('电脑出了：%s' %(computer_choice))
print('你出了：%s' %(user_choice))

# 胜负
""" 
index() 函数用于找出列表中某个元素第一次出现的索引位置。
语法为：list.index(obj)，obj为object（对象）的缩写。
具体可参考右侧的代码和运行结果。
"""
print('—————结果—————')
if user_choice == computer_choice:  # 使用if进行条件判断
    print('平局！')
# 请你将下一行代码用 index()函数 实现（不再有 and 和 or），从而简化代码。
# elif user_choice == punches[punches.index(computer_choice)-1]:
elif (user_choice == '石头' and computer_choice == '剪刀') or (user_choice == '剪刀' and computer_choice == '布') or (user_choice == '布' and computer_choice == '石头'):
    print('你赢了！')
    print(punches.index(user_choice))
else:
    print('你输了！')
