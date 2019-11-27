import requests
from bs4 import BeautifulSoup #引入BS库
try:
    res = requests.get('https://wordpress-edu-3autumn.localprod.oc.forchange.cn/all-about-the-future_04/')
    res.raise_for_status()
    # 请求结果转换成bs对象
    soup = BeautifulSoup(res.text, 'html.parser') #需要安装这个解释器
    commentTag = soup.find('body').find('div',id="page").find('div', class_='site-content-contain').find('div', class_='site-content').find('div', class_='wrap').find('div', class_='content-area').find('main', class_='site-main').find('div', class_='comments-area').find('ol', class_='comment-list')
    #print(commentTag)
    commentList = commentTag.find_all('li',class_='comment')
    for comm in commentList:
      author = comm.find('article').find('footer').find('div',class_='comment-author').find('b',class_='fn').text
      time = comm.find('article').find('footer').find('div',class_='comment-metadata').find('a').find('time').text
      content = comm.find('article').find('div',class_='comment-content').find('p').text
      print('%s(%s)：\r\n“%s”' %(author,time.strip(),content))
except:
    print('解析失败',res.status_code)