# 爬取时光网TOP100的数据
#提示：
#1.分析数据存在哪里（打开“检查”工具，刷新页面，查看第0个请求，看【response】）
#2.观察网址规律（多翻几页，看看网址会有什么变化）
# http://www.mtime.com/top/tv/top100/index-4.html【规律：4就是第四页，即31-40条数据】
#3.获取、解析和提取数据（需涉及知识点：queue、gevent、request、BeautifulSoup、find和find_all）
#4.存储数据（csv本身的编码格式是utf-8，可以往open（）里传入参数encoding='utf-8'。这样能避免由编码问题引起的报错。)
#注：在练习的【文件】中，你能找到自己创建的csv文件。将其下载到本地电脑后，请用记事本打开，因为用Excel打开可能会因编码问题出现乱码。

