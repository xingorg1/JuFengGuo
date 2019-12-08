# 读取本地存储的cookie 先把字符串转成字典，再把字典转成cookies本来的格式
site = '/Users/guojufeng/Documents/GitHub/JuFengGuo/Python/Robots/'

cookies_txt = open(site + '8-3cookies.txt', 'r')  #以reader读取模式，打开名为cookies.txt的文件。

cookies_dict = json.loads(cookies_txt.read())   #调用json模块的loads函数，把字符串转成字典。

cookies = requests.utils.cookiejar_from_dict(cookies_dict)  #把转成字典的cookies再转成cookies本来的格式。

session.cookies = cookies   #获取cookies：就是调用requests对象（session）的cookies属性。