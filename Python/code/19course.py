import csv
# with open('assets.csv', 'a', newline='', encoding='GBK') as csvfile: // Mac用户要在open里加上这个改变文件的编码格式
with open('./JuFengGuo/Python/code/assets.csv', 'a', newline='') as csvfile:
#调用open()函数打开csv文件，传入参数：文件名“assets.csv”，、追加模式“a”、newline=''。
    writer = csv.writer(csvfile, dialect='excel')
    # 用csv.writer()函数创建一个writer对象。
    header = ['小区名称','地址', '建筑时间','楼栋', '单元',  '门牌', '朝向', '面积']
    # 用writerow()函数将表头写进csv文件
    writer.writerow(header)
    #用writerow（）函数将表头写进csv文件里

start_floor = input('请输入起始楼层：')
end_floor = input('请输入终止楼层：')

input('接下来请依次输入起始层每个房间的户室尾号、南北朝向及面积，按任意键继续')

start_floor_rooms = {}
floor_last_number = []
# 收集起始层的房间信息

# 定义循环控制量
room_loop = True
while room_loop:
    last_number = input('请输入起始楼层户室的尾号:（如01，02）')
    floor_last_number.append(last_number)
    #将尾号用append()添加列表里，如floor_last_number = ['01','02']
    room_number = int(start_floor + last_number)
    #户室号为room_number,由楼层start_floor和尾号last_number组成,如301

    direction = int(input('请输入 %d 的朝向(南北朝向输入1，东西朝向输入2)：' % room_number ))
    area = int(input('请输入 %d 的面积，单位 ㎡ ：' % room_number))
    start_floor_rooms[room_number] = [direction,area]
    # 户室号为键，朝向和面积组成的列表为值，添加到字典里，如start_floor_rooms = {301:[1,70]}

    continued= input('是否需要输入下一个尾号？按 n 停止输入，按其他任意键继续：')
    #加入打破循环的条件
    if continued == 'n':
        room_loop = False
    else:
        room_loop = True
print(start_floor_rooms)