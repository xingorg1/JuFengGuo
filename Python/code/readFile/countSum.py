# 读取文件信息并计算
scores = open('/Users/guojufeng/Documents/GitHub/JuFengGuo/Python/code/readFile/scores.txt', 'r', encoding = 'UTF-8')
scoresResult = scores.readlines() # read读出来是一个字符串，readlines读出来是一个列表
# print(scoresResult)

resultList = []

for line in scoresResult:
  # print(line,line.split())
  lineList = line.split() # 将每一项字符串按照空格进行切割成新的列表
  sum = 0
  for item in lineList[1:]: # 从list的第二项（分数）开始累加
    # print(item)
    sum = sum + int(item) # 求当前人的分数总和
  # print(sum)
  resultList.append('%s：%d\n' %(lineList[0], sum)) # 将计算的总数和名字合并成字符串，追加到事先准备好的list中

# print(resultList)
scores.close() # 切记关闭文件

# 计算结果写入新的文件，如没有该文件，会自动新建
resultFile = open('/Users/guojufeng/Documents/GitHub/JuFengGuo/Python/code/readFile/scoresResult.txt', 'w', encoding='UTF-8')

resultFile.writelines(resultList) # write只能写入字符串，writelines可以写入list

resultFile.close() # 切记关闭文件