# excel文件读取 - 基本用法、思路同文件写入：csv-write.py
import csv
#引用csv模块。
site = '/Users/guojufeng/Documents/GitHub/JuFengGuo/Python/code/csv/'

with open(site + 'to_addrs.csv', 'r') as f:
    reader = csv.reader(f)
    for row in reader: 
        print(row)
        to_addrs=row[1] 
        print(to_addrs)
