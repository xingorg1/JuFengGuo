# excel文件写入
import csv
#引用csv模块。
site = '/Users/guojufeng/Documents/GitHub/JuFengGuo/Python/code/csv/'
data = [['姓名', '邮箱地址'],['xing.org1^', 'xing.org1^@outlook.com'],['小石头', '702004176@qq.com']]
#待写入csv文件的内容

with open(site + 'to_addrs.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    # 变量writer进行写入
    for row in data:
        writer.writerow(row)
        # 数据写入的方法是writerow()。通过遍历列表data将数据一行行写到了to_addrs.csv文件中。
# 使用的是with语句新建文件的好处是：到达语句末尾时，会自动关闭文件，不需要close()。        