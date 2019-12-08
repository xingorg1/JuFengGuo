# 目标：把豆瓣TOP250里面的 序号/电影名/评分/推荐语/链接 都爬取下来，结果是存储在csv和Excel中

# 本篇存在excel中
import requests
import random
import bs4
import openpyxl
movieDict = {}
site = '/Users/guojufeng/Documents/GitHub/JuFengGuo/Python/Robots/'
# 先创建一个工作表
wb = openpyxl.Workbook()
sheet = wb.active
sheet.title="douban movie"
sheet.append(['序号','电影名称','评分','描述语','详情页地址'])
# 拔取movie信息
for x in range(10):
    url = 'https://movie.douban.com/top250?start=' + str(x*25) + '&filter='
    headers = {
        "Host": "movie.douban.com",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    }
    res = requests.get(url, headers=headers)
    bs = bs4.BeautifulSoup(res.text, 'html.parser')
    movieList = bs.find('ol', class_="grid_view").find_all('li')
    for movie in movieList:
        num = movie.find('em', class_="").text  # 查找序号
        title = movie.find('span', class_="title").text  # 查找电影名
        tes = movie.find('span', class_="inq")
        if tes is None:
            tes = '无'
        else:
            tes = tes.text
        score = movie.find('span', class_="rating_num").text  # 查找评分
        url_movie = movie.find('a')['href']  # 查找地址
        sheet.append([num,title,score,tes,url_movie])
        movieDict[title] = {
            "id": num,
            "评分": score,
            "推荐语": tes,
            "地址": url_movie
        }
        print(num + '.' + title + '——' + score +
                '\n' + '推荐语：' + tes + '\n' + url_movie)
        print('====')
        

wb.save(site + '6-5-xl-豆瓣电影TOP250.xlsx')
