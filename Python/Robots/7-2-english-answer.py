import requests

link = requests.get('https://www.shanbay.com/api/v1/vocabtest/category/')
#先用requests下载链接。
js_link = link.json()
#解析下载得到的内容。
bianhao = int(input('''请输入你选择的词库编号，按Enter确认
1，GMAT  2，考研  3，高考  4，四级  5，六级
6，英专  7，托福  8，GRE  9，雅思  10，任意
>'''))
#让用户选择自己想测的词库，输入数字编号。int()来转换数据类型
ciku = js_link['data'][bianhao-1][0]
#利用用户输入的数字编号，获取题库的代码。如果以输入“高考”的编号“3”为例，那么ciku的值就是，在字典js_link中查找data的值，data是一个list，查找它的第bianhao-1，也就是第2个元素，得到的依然是一个list，再查找该list的第0个元素。最后得到的就是我们想要的NCEE。
test = requests.get('https://www.shanbay.com/api/v1/vocabtest/vocabularies/?category='+ciku)
#下载用于测试的50个单词。
words = test.json()
#对test进行解析。
danci = []
#新增一个list，用于统计用户认识的单词
words_knows = []
#创建一个空的列表，用于记录用户认识的单词。
not_knows = []
#创建一个空的列表，用于记录用户不认识的单词。
print ('测试现在开始。如果你认识这个单词，请输入Y，否则直接敲Enter：')
n=0
for x in words['data']:
#启动一个循环，循环的次数等于单词的数量。
    n=n+1
    print ("\n第"+str(n)+'个：'+x['content'])
    #加一个\n，用于换行。
    answer = input('认识请敲Y，否则敲Enter：')
    #让用户输入自己是否认识。
    if answer == 'Y':
    #如果用户认识：
        danci.append(x['content'])
        words_knows.append(x)
        #就把这个单词，追加进列表words_knows。
    else:
    #否则
        not_knows.append(x)
        #就把这个单词，追加进列表not_knows。


print ('\n在上述'+str(len(words['data']))+'个单词当中，有'+str(len(danci))+'个是你觉得自己认识的，它们是：')
print(danci)


print ('现在我们来检测一下，你有没有真正掌握它们：')
wrong_words = []
right_num = 0
for y in words_knows:
    print('\n\n'+'A:'+y['definition_choices'][0]['definition'])
    #我们改用A、B、C、D，不再用rank值，下同
    print('B:'+y['definition_choices'][1]['definition'])
    print('C:'+y['definition_choices'][2]['definition'])
    print('D:'+y['definition_choices'][3]['definition'])
    xuanze = input('请选择单词\"'+y['content']+'\"的正确翻译（输入字母即可）：')
    dic = {'A':y['definition_choices'][0]['rank'],'B':y['definition_choices'][1]['rank'],'C':y['definition_choices'][2]['rank'],'D':y['definition_choices'][3]['rank']} 
    #我们创建一个字典，搭建起A、B、C、D和四个rank值的映射关系。
    if dic[xuanze] == y['rank']:
    #此时dic[xuanze]的内容，其实就是rank值，此时的代码含义已经和之前的版本相同了。
        right_num += 1
    else:
        wrong_words.append(y)

print ('现在，到了公布成绩的时刻:')
print ('在'+str(len(words['data']))+'个'+js_link['data'][bianhao-1][1]+'词汇当中，你认识其中'+str(len(danci))+'个，实际掌握'+str(right_num)+'个，错误'+str(len(wrong_words))+'个。')
#这是句蛮复杂的话，对照前面的代码和json文件你才能理解它。一个运行示例是：在50个高考词汇当中，你认识其中30个，实际掌握25个，错误5个。

save = input ('是否打印并保存你的错词集？填入Y或N： ')
#询问用户，是否要打印并保存错题集。
if save == 'Y':
#如果用户说是：
    f = open('错题集.txt', 'a+')
    #在当前目录下，创建一个错题集.txt的文档。        
    print ('你记错的单词有：')
    f.write('你记错的单词有：\n')
    #写入"你记错的单词有：\n"
    m=0
    for z in wrong_words:
    #启动一个循环，循环的次数等于，用户的错词数：
        m=m+1
        print (z['content'])
        #打印每一个错词。
        f.write(str(m+1) +'. '+ z['content']+'\n')
        #写入序号，写入错词。           
    print ('你不认识的单词有：')
    f.write('你没记住的单词有：\n')
    #写入"你没记住的单词有：\n"
    s=0
    for x in not_knows:
    #启动一个循环，循环的次数等于，用户不认识的单词数。
        print (x['content'])
        #打印每一个不认识的单词。
        f.write(str(s+1) +'. '+ x['content']+'\n')
        #写入序号，写入用户不认识的词汇。 
    print ('错词和没记住的词已保存至当前文件目录下，下次见！')
    #告诉用户，文件已经保存好。
    #在网页版终端运行时，文件会被写在课程的服务器上，你看不到，但它的确已经存在。
else:
#如果用户不想保存：
    print('下次见！')
    #输出“下次见！”