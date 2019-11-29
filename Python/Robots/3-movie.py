# 目标：把豆瓣TOP250里面的 序号/电影名/评分/推荐语/链接 都爬取下来，结果就是全部展示打印出来

# 首页 https://movie.douban.com/top250?start=0&filter=

# 一共10页，每页的url有什么相关呢？
# 第1页：https://movie.douban.com/top250?start=0&filter=
# 第3页：https://movie.douban.com/top250?start=50&filter=
# 第7页：https://movie.douban.com/top250?start=150&filter=

# 只有start后面是有变化哒，规律就是第N页，start=(N-1)*25

# 思路一：先爬取最小共同父级标签 <li>，然后针对每一个父级标签，提取里面的序号/电影名/评分/推荐语/链接。

import requests, random, bs4

for x in range(10):
    url = 'https://movie.douban.com/top250?start=' + str(x*25) + '&filter='
    res = requests.get(url)
    bs = bs4.BeautifulSoup(res.text, 'html.parser')
    bs = bs.find('ol', class_="grid_view")
    for titles in bs.find_all('li'):
        num = titles.find('em',class_="").text
        #查找序号
        title = titles.find('span', class_="title").text
        #查找电影名
        tes = titles.find('span',class_="inq").text
        #查找推荐语
        comment = titles.find('span',class_="rating_num").text
        #查找评分
        url_movie = titles.find('a')['href']

        print(num + '.' + title + '——' + comment + '\n' + '推荐语：' + tes +'\n' + url_movie)