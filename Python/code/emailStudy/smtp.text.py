import smtplib
from email.header import Header
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
print(smtplib)

# 收信方邮箱
username = input('输入要登录邮箱的地址：')
password = input('输入邮箱的SMTP授权码：')

# 发信服务器
to_addr = input('输入收件人：')

# 邮箱正文内容  plain:文本类型type的默认值；utf-8: 文本编码chartset的默认值
msg = '''【早安】
          世事茫茫，光阴有限，算来何必奔忙？
          人生碌碌，竞短论长，
          却不道荣枯有数，得失难量。
          一任他人情反复，世态炎凉，
          优游闲岁月，潇洒度时光。
                        ——沈复《浮生六记》
'''
sendMsg = MIMEText(msg, 'plain','utf-8')

# 邮件头信息
sendMsg['From'] = Header('小石头')
sendMsg['To'] = Header('xing.org1^')
sendMsg['Subject'] = Header('代码改变世界，python使我更强！')

# 开启发信服务，这里使用的是加密传输
server = smtplib.SMTP()
server.connect('smtp.qq.com', 25)
server.login(username, password) 
server.sendmail(username, to_addr, sendMsg.as_string()) 
server.quit() 

print('发送成功，请注意查收！')

# server = smtplib.SMTP_SSL()
# #如果端口是用SSL加密，请这样写代码。其中server是变量名
# server.connect('smtp.qq.com', 465)
# #如果出现编码错误UnicodeDecodeError，你可以这样写：server.connect('smtp.qq.com', 465,'utf-8')
# https://service.mail.qq.com/cgi-bin/help?subtype=1&&id=28&&no=369  如何设置POP3/SMTP的SSL加密方式？
# 接收邮件服务器：imap.qq.com，使用SSL，端口号993
# 接收邮件服务器：pop.qq.com，使用SSL，端口号995
# 发送邮件服务器：smtp.qq.com，使用SSL，端口号465或587