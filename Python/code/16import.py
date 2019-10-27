# 第一行：必不可少的调用模块。
import time
site = '/Users/guojufeng/Documents/GitHub/JuFengGuo/Python/code/'

input("欢迎使用“时间管理器”！请按回车继续。")

while True:
    task_name = input('请输入任务名：')
    task_time = int(input('你觉得自己至少可以专注这个任务多少分钟？输入 N 分钟'))
    input('此次任务信息：\n我要完成的任务：%s\n我至少要专注：%d分钟\n按回车开始专注：'%(task_name,task_time))
    # 下面应该要有两行代码，自动记录可以计算以及可以打印的开始时间。
    # time模块中的时间戳（可进行日期运算）和格式化日期（可将日期转换成平常我们所见的格式）；
    startTime = time.time() # 时间戳，用于时间计算
    print("开始时间为 :", time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())) #格式化时间，用于展示
    print(startTime)

    # 这里可以加一个倒计时，实时显示还剩多少时间，可参考左侧提供的资料。代码量大概有5行。
    count = 0 
    b = task_time * 60 
    while (count < b):
      ncount = b - count 
      print('倒计时：',ncount) 
      time.sleep(1)
      count += 1 


    task_status = input('请在任务完成后按输入y:')
    # actual_time = input('该任务实际用时为几分钟？')
    if task_status == 'y':
      t =  time.time() - startTime #%.2f
      # 下面应该要有两行代码，自动记录可以计算以及可以打印的结束时间。
      # 有了自动记录的始末时间后，记录的代码也需要随之改变。
      with open(site + 'timelog2.txt','a', encoding = 'utf-8') as f:
        f.write(task_name + ' 的预计时长为：' + str(task_time) + '分钟\n')
#             f.write(task_name + ' 的实际时长为：' + str() + '分钟\n')
        f.write('%s的实际时长为：%.0f分 %.0f秒' %(task_name, t // 60, t % 60))
        again = input('建立一个新任务请按 y, 退出时间日志记录器请按 q：')
        if again == 'q':            
            break
    else:
        print('抱歉，你的输入有误。请重启时间记录器。')

print('愿被你善待的时光，予你美好的回赠。')
