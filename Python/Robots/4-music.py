# https://y.qq.com/portal/search.html#page=1&searchid=1&remoteplace=txt.yqq.top&t=song&w=%E5%91%A8%E6%9D%B0%E4%BC%A6
# 从开发者工具的network面板找到返回数据的JSON文件，并对JSON文件进行解析。
import requests
url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=60997426243444153&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=20&w=%E5%91%A8%E6%9D%B0%E4%BC%A6&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'
# 引用requests库
res_music = requests.get(url)
# 调用get方法，下载这个字典
json_music = res_music.json()
# 使用json()方法，将response对象，转为列表/字典
songList = []
for item in json_music['data']['song']['list']:
    songList.append(item['name'])
    # 以name为键，查找歌曲名
    print('所属专辑：'+item['album']['name'])
    # 查找专辑名
    print('播放时长：'+str(item['interval'])+'秒')
    # 查找播放时长
    print('播放链接：https://y.qq.com/n/yqq/song/'+item['mid']+'.html\n\n')
    # 查找播放链接
print(songList,len(songList))

# 扩展，爬取歌曲名、所属专辑、播放时长，以及播放链接

