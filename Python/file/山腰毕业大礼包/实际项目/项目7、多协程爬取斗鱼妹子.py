import gevent
from gevent import monkey
monkey.patch_all()

import requests
from urllib import request

# url = "https://www.douyu.com/gapi/rknc/directory/yzRec/3"

headers = {
    'User-Agent': "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
}

def get_meizi(page):
    url = "https://www.douyu.com/gapi/rknc/directory/yzRec/%d" % page
    response = requests.get(url, headers=headers)
    content = response.json()
    meizi_list = content['data']['rl']
    for meizi in meizi_list:
        name = meizi.get('nn')  # 主播名称
        icon = meizi.get('rs1')  # 主播图片url

        # 下载图片
        request.urlretrieve(icon, 'douyu/%s.png'%name)
        request.urlcleanup()


if __name__ == '__main__':
    g_list = []
    for page in range(1, 5):
        g = gevent.spawn(get_meizi, page)
        g_list.append(g)
    gevent.joinall(g_list)




