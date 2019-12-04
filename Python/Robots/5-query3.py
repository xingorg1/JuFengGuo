# 获取前五页所有歌曲的歌词。
import requests
from urllib.request import quote
# 1、参数准备
# 这里没用for循环翻5页实现，而是观察network里边的XHR，发现一个get请求，只要修改参数就能获取对应信息。如果直接把代表条数的n改为50
# https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=60584568161200537&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=50&w=%E5%91%A8%E6%9D%B0%E4%BC%A6&g_tk=5381&loginUin=702004176&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0
getSongUrl = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp'
pageUrl = 'https://y.qq.com/portal/search.html'
# pageUrl + "page=1&searchid=1&remoteplace=txt.yqq.top&t=song&w=%E5%91%A8%E6%9D%B0%E4%BC%A6"

headers = {
    'origin': 'https://y.qq.com',
    # 请求来源，本案例中其实是不需要加这个参数的，只是为了演示
    'referer': 'https://y.qq.com/n/yqq/song/004Z8Ihr0JIu5s.html',
    # 请求来源，携带的信息比“origin”更丰富，本案例中其实是不需要加这个参数的，只是为了演示
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
    # 标记了请求从什么设备，什么浏览器上发出
}
# 2、填写自定义信息
singerName = input('输入要查询的歌手名字：')
pageNum = input('输入要查询的条数（整数）：')

# 3、处理url参数
paramsList = []
params = {
    'ct': '24',
    'qqmusic_ver': '1298',
    'new_json': '1',
    'remoteplace': 'txt.yqq.song',
    'searchid': '60584568161200537',
    't': '0',
    'aggr': '1',
    'cr': '1',
    'catZhida': '1',
    'lossless': '0',
    'flag_qc': '0',
    'p': '1',
    'n': pageNum,
    'w': quote(singerName.encode('utf-8')),
    'g_tk': '5381',
    'loginUin': '0',
    'hostUin': '0',
    'format': 'json',
    'inCharset': 'utf8',
    'outCharset': 'utf-8',
    'notice': '0',
    'platform': 'yqq.json',
    'needNewCode': '0'
}
for item in params:
    paramsList.append('%s=%s' % (item, params[item]))

# 4、发起请求，得到每一首歌曲的信息
res = requests.get(getSongUrl + '?' + '&'.join(paramsList), headers=headers)
result = res.json()
songList = result['data']['song']['list']
songListLen = len(songList)
songNameList = []
for songNum in range(songListLen):
    songNameList.append(songList[songNum]['name'])
    print(songNum+1, songList[songNum]['name'])

print('==========================================')
songId = input('一共找到%s的%d首歌曲，请输入你要查询歌词的歌曲的序号：' % (singerName, songListLen))
# 准备歌词
# lyricParams = {
#   'nobase64': '1',
#   'musicid': '0',
#   '-': 'jsonp1',
#   'g_tk': '5381',
#   'loginUin': '0',
#   'hostUin': '0',
#   'format': 'json',
#   'inCharset': 'utf8',
#   'outCharset': 'utf-8',
#   'notice': '0',
#   'platform': 'yqq.json',
#   'needNewCode': '0'
# }
for song in range(songListLen):
    # singleSongUrl = 'https://y.qq.com/n/yqq/song/' + songList[song]['mid'] +'.html' # 完整的音乐页面链接是由这个参数拼接的 - mid: "0039MnYb0qxYhV"
    # 同样，不同页面查找的方式，换成ajax请求的方式
    # print('要找的是：', songList[song]['name'],songNameList[int(songId) - 1])
    if songList[song]['name'] == songNameList[int(songId) - 1]:
        # lyricParams['musicid'] = songList[song]['id']  # 获取歌词的XHR需要id这个参数
        singleSongUrl = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_yqq.fcg?nobase64=1&musicid=' + \
            str(songList[song]['id']) + \
            '&-=jsonp1&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'
        res = requests.get(singleSongUrl, headers=headers)
        lyricResult = res.json()
        print('歌词如下：%s' % (lyricResult['lyric']))
        break

# print(HtmlDecode(lyricResult['lyric'])) # 解开“HTML实体编码”