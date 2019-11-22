unit_rooms={ 3:{301:[1,80],302:[1,80],303:[2,90],304:[2,90]},
             4:{401:[1,80],402:[1,80],403:[2,90],404:[2,90]},
             5:{501:[1,80],502:[1,80],503:[2,90],504:[2,90]}
            }
#打印unit_rooms的每一项
for i in unit_rooms:
  print('%d的数据是' %(i))
print('%s字符串%s' %('我是','哈哈'))

unit_rooms={ 3:{301:[1,80],302:[1,80],303:[2,90],304:[2,90]},
             4:{401:[1,80],402:[1,80],403:[2,90],404:[2,90]},
             5:{501:[1,80],502:[1,80],503:[2,90],504:[2,90]}
            }
print(unit_rooms)
for floor in unit_rooms:
	for room in unit_rooms[floor]:
		print('%d楼%d单元，方向%d、面积%d平方' %(floor,room,unit_rooms[floor][room][0],unit_rooms[floor][room][1]))

# 利用dictionary.values()的方法获取键值对
unit_rooms = {'name':{'hah':[1,80]},
             'age':{'aew':[1,80],404:[2,90]},
             'hobby':{502:[1,80]}
            }
for sub_dict in unit_rooms.values():
    print(sub_dict)
for k,v in unit_rooms.items():
    print(k,v)

unit_rooms = {3:{301:[1,80],302:[1,80],303:[2,90],304:[2,90]},
             4:{401:[1,80],402:[1,80],403:[2,90],404:[2,90]},
             5:{501:[1,80],502:[1,80],503:[2,90],504:[2,90]}
            }
for sub_dict in unit_rooms.values():
# 遍历大字典的值，即小字典sub_dict
  for num,item in sub_dict.items():
    print('[户室号: %d,朝向: %d, 面积: %d]' %(num, item[0], item[1]))
