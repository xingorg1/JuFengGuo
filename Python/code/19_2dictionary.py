# 根据输入的楼层号，赋值输出每一层每一户的数据
start_floor = '3'
end_floor = '5'
floor_last_number = ['01','02','03']

start_floor_rooms = {301:[1,81], 302:[1,100], 303:[2,90]}

unit_rooms={}

for floor in range(int(start_floor), int(end_floor) + 1):
	endObj = {}
	for room in floor_last_number:
		print(room,str(floor) + room)
		endObj[int(str(floor) + room)] = start_floor_rooms[int('3' + room)]
	unit_rooms[floor] = endObj
print(endObj)
print(unit_rooms)