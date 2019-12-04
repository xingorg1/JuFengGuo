text='&#22270;&#28789;&#31243;&#24207;&#35774;&#35745;&#19995;&#20070;'
text=text.replace('&#','')
text=[i for i in text.split(';') if i]
text=[hex(int(i)) for i in text]
text=[i.replace('0x','') for i in text]
string=' '
flag='\\u'
for i in text:
                string+=flag+format(i,'0>4s')
print(string.encode('utf-8').decode('unicode-escape'))
# ————————————————
# 版权声明：本文为CSDN博主「吱吱不倦小子」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
# 原文链接：https://blog.csdn.net/u013109501/article/details/83863476