# 扇贝网：https://www.shanbay.com/已经有一个测单词量的功能，
# 我们要做的就是把这个功能复制下来，并且做点改良，搞一个网页版没有的功能 ———— 自动生成错词本。
import requests
import json
# （0）. 选择题库。
# 写这个程序，要用到requests模块。
# 先用requests下载链接，再用res.json()解析下载内容。
# 让用户选择想测的词库，输入数字编号，获取题库的代码。

# 提示：记得给input前面加一个int()来转换数据类型
print('获取单词类型...')
res = requests.get(
    'https://www.shanbay.com/api/v1/vocabtest/category/?_=1575805196580')
data = res.json()
dataList = data['data']
print(dataList)
num = 1
for index in dataList:
    print(num, index[1])
    num += 1
selectType = input('请选择你要考察的范围(输入序号即可)：')

# （1）. 根据选择的题库，获取50个单词。
# 第0步我们已经拿到链接，这步直接用requests去下载，re.json()解析即可。
selectRst = dataList[int(selectType) - 1][0]
print(selectRst, '获取%s相关的50个单词...' % (dataList[int(selectType) - 1][1]))
res2 = requests.get(
    'https://www.shanbay.com/api/v1/vocabtest/vocabularies/?category='+selectRst+'&_=1575805204369')
data2 = res2.json()
if data2['msg'] == "SUCCESS":
    enWordList = data2['data']
    # 存储字典
    enWordDict = {}
    for w in enWordList:
        enWordDict[w['content']] = w
    print(enWordDict)
    print('===================================================')
    # print(enWordList)
    # （2）. 让用户选择认识的单词：此处，要分别记录下用户认识哪些，不认识哪些。
    # 已经有了单词数据，提取出来让用户识别，并记录用户认识哪些不认识哪些，至少2个list来记录。
    # 50个单词，记得要用循环。
    # 用户手动输入自己的选择，用input() 。
    # 我们要识别用户的输入，并基于此决定把这个单词放进哪个list，需要用if语句。
    # 提示：当一个元素特别长的时候，给代码多加一个list。
    # 提示：加个换行，优化用户视角。
    # 新增一个list，用于统计用户认识的单词
    knowList = []  # 创建一个空的列表，用于记录用户认识的单词。
    understandList = []  # 创建一个空的列表，用于记录用户不认识的单词。
    wordStr = ''
    for item in range(len(enWordList)):  # 启动一个循环，循环的次数等于单词的数量。
        word = enWordList[item]['content']
        wordStr += '【 '+str(item + 1)+' : '+word+' 】'
    print(wordStr)  # 记得加一个\n，用于换行。
    rst = input('请输入认识单词的序号，用英文逗号隔开：')  # 让用户输入自己是否认识。
    knowList = []
    for konw in rst.split(','):
      knowWord = enWordList[int(konw)-1]['content']
      knowList.append(knowWord) # 就把用户认识的单词，追加进列表knowList。
    print('统计数据：这么多单词，认识%s个，认识的有:%s\n' % (len(knowList), knowList)) # 打印一个统计数据：这么多单词，认识几个，认识的有哪些？
    # （3）. 对于用户认识的单词，给选择题让用户做：此处要记录用户做对了哪些，做错了哪些。
    # 这一步是第0步和第2步的组合——涉及到第0步中的选择，也涉及到第2步的数据记录。
    # 提示： 面对冗长的字典列表相互嵌套，可以创建字典。
    print('===================================================')
    answerRst = []
    print('接下来请选择你认识的单词的具体含义，来检测是否真的认识此单词：\n')
    for getW in knowList:
      itemDict = enWordDict[getW]
      zhengque = ''
      zhengqueID = itemDict['pk']
      print('单词%s的意思为：\n' %(getW))
      selectDict = ['A','B','C','D','E','F']
      num = 0
      for enZH in itemDict['definition_choices']:
        print('%s：%s' %(selectDict[num],enZH['definition']))
        num += 1
        if zhengqueID == enZH['pk']:
          zhengque = enZH['definition']
      ans = input('\n输入你认为正确含义的答案（输入A、B、C、D）：')
      ansID = itemDict['definition_choices'][selectDict.index(ans)]['pk']
      if ansID == zhengqueID:
        print('回答正确\n')
        answerRst.append(getW)
      else:
        print('\n回答错误，正确含义是：',zhengque)
    print('\n真正认识的单词有：', answerRst)
    #（4）. 生成报告：50个单词，不认识多少，认识多少，掌握多少，错了多少。
    # 生成报告主要有三部分：第0，是输出统计数据；第1，是打印错题集；第2，是把错题集保存到本地。
