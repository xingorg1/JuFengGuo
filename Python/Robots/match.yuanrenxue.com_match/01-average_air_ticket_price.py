# 引用requests库
import requests
url = 'http://match.yuanrenxue.com/match/1'
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
    print('播放链接：https://y.qq.com/n/yqq/song/'+item['mid']+'.html\n\n') # json里边不一定就有完整的url信息，也可能是其他参数拼接的。比如这个。
    # 查找播放链接
print(songList,len(songList))

# 扩展，爬取歌曲名、所属专辑、播放时长，以及播放链接

