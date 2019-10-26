
# 读文件的三步:开——读——关，

# 1、开
# 字符串 'r'，表示 read，表示我们以读的模式打开了这个文件。除了'r',其他还有'w'(写入)，'a'(追加)等模式
file1 = open('/Users/guojufeng/Documents/GitHub/JuFengGuo/Python/code/readFile/abc.txt','r',encoding='utf-8') 
# file1这个变量是存放读取的文件数据的


# 2、读
# 用read()函数进行读取的操作

filecontent = file1.read()   
print("读取结果是：",filecontent)

# 【第3步-关】关闭文件，使用的是close()函数。
file1.close()
# 为啥要关闭文件呢？原因有两个：1.计算机能够打开的文件数量是有限制的，open()过多而不close()的话，就不能再打开文件了。2.能保证写入的内容已经在文件里被保存好了。