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
params = {
    'include': 'data[*].comment_count,suggest_edit,is_normal,thumbnail_extra_info,thumbnail,can_comment,comment_permission,admin_closed_comment,content,voteup_count,created,updated,upvoted_followees,voting,review_info,is_labeled,label_info;data[*].author.badge[?(type=best_answerer)].topics',
    'offset': '0',
    'limit': '20',
    'sort_by': 'voteups'
}
res = requests.get(url, headers=headers, params=params)
x = 0

print(res.text[:90])
resData = json.loads(res.text)
for item in resData['data']:
    types = item['type']
    title = item['title']
    cont = item['excerpt']
    url = item['url']
    writer.writerow([x, types, title, cont, url])
    x += 1

print('填写完毕，请查看本地文件')
writerObj.close()
