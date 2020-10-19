# 爬虫-网页内容读取（难点是：内容是js填充的）
import requests
url = 'http://match.yuanrenxue.com/match/1'
from bs4 import BeautifulSoup #引入BS库
try:
    res = requests.get(url)
    res.raise_for_status()
    # print(res)
    # # 请求结果转换成bs对象
    soup = BeautifulSoup(res.text, 'html.parser') #需要安装这个解释器
    # print(soup)
    # ws = open('abc.txt','w',encoding='utf-8') 
    # ws.write(res.text)
    # filecontent = ws.write(soup)   
    # print(filecontent)
    # ws.close()
    commentTag = soup.find('body').find('div',class_="m-airfly-lst").find('div', class_='b-airfly')
    print(commentTag)
    # commentList = commentTag.find_all('li',class_='comment')
    # for comm in commentList:
    #   author = comm.find('article').find('footer').find('div',class_='comment-author').find('b',class_='fn').text
    #   time = comm.find('article').find('footer').find('div',class_='comment-metadata').find('a').find('time').text
    #   content = comm.find('article').find('div',class_='comment-content').find('p').text
    #   print('%s(%s)：\r\n“%s”' %(author,time.strip(),content))
except:
    print('解析失败',res.status_code)

