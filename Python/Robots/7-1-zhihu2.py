# 爬取知乎大v张佳玮的文章“标题”、“摘要”、“链接”，并存储到本地文件
import requests
import json
from bs4 import BeautifulSoup
import csv
# 引入request和bs
url = 'https://www.zhihu.com/api/v4/members/zhang-jia-wei/articles'
# 创建csv文件
site = '/Users/guojufeng/Documents/GitHub/JuFengGuo/Python/Robots/'
writerObj = open(site + '7-1-zhihuArticle.csv',
                 'w', newline="", encoding="utf-8")
writer = csv.writer(writerObj)
writer.writerow(['序号', '类型', '标题', '摘要', '链接'])
headers = {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'}
offset = 0
x = 1
def getZhiHu(x,offset):
    params = {
        'include': 'data[*].comment_count,suggest_edit,is_normal,thumbnail_extra_info,thumbnail,can_comment,comment_permission,admin_closed_comment,content,voteup_count,created,updated,upvoted_followees,voting,review_info,is_labeled,label_info;data[*].author.badge[?(type=best_answerer)].topics',
        'offset': offset,
        'limit': '20',
        'sort_by': 'voteups'
    }
    res = requests.get(url, headers=headers, params=params)
    print(offset, res.text[:45])
    data = json.loads(res.text)['data']
    # resData = json.loads(res.text)
    for item in data:
        types = item['type']
        title = item['title']
        cont = item['excerpt']
        article_url = item['url']
        print(x, title)
        writer.writerow([x, types, title, cont, article_url])
        x += 1
    if len(data) > 0:
        result = offset + 20
        getZhiHu(x,result)
getZhiHu(x,offset)


print('读取并填写完毕，请查看本地文件')
writerObj.close()
