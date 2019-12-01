import csv
site = '/Users/guojufeng/Documents/GitHub/JuFengGuo/Python/Robots/'
csv_file=open(site + '6-2-csvWrite.csv','r',newline='',encoding='utf-8')
reader=csv.reader(csv_file)
print(reader)
for row in reader:
    print(row)
csv_file.close()