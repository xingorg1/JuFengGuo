# 下载电影吧٩̋(๑˃́ꇴ˂̀๑)
# 实现功能：用户输入喜欢的电影名字，程序即可在电影天堂https://www.ygdy8.com爬取电影所对应的下载链接，并将下载链接打印出来。

import requests
from bs4 import BeautifulSoup
from urllib.request import quote
#quote()函数，可以帮我们把内容转为标准的url格式，作为网址的一部分打开
