# 输入单号查找快递信息
import requests
import random
# 材料准备
typeList = ['百世快递', '申通', '韵达', '中通', '顺丰', '京东物流']
typeListZH = ['baishiwuliu', 'shentong',
              'yunda', 'zhongtong', 'shunfeng', 'jd']

for index in range(len(typeList)):
    print('编号：%s - 快递公司：%s' % (index, typeList[index]))

# 填写请求信息
queryType = input('请输入快递公司序号：')
number = input('输入快递单号：')  # 23852935792
if int(queryType) > len(typeList):
  print('输入序号不正确')
else:
  headers = {
      "Cookie": "WWWID=WWW06D638C4A89D2E7FD8E1E170D29F5B40; Hm_lvt_22ea01af58ba2be0fec7c11b25e88e6c=1575189740; Hm_lpvt_22ea01af58ba2be0fec7c11b25e88e6c=1575189740",
      "Host": "www.kuaidi100.com",
      "Origin": "https://www.kuaidi100.com",
      "Referer": "https://www.kuaidi100.com/",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
  }

  params = {
      'type': typeListZH[int(queryType)],
      'postid': number,
      'temp': str(random.random()),
      'phone': ''
  }
  print('参数为：', params)

  # 发起请求
  print('请求查找中......')
  res = requests.get('https://www.kuaidi100.com/query',
                    headers=headers, params=params)
  # 爬虫出现5xx错误码，服务器拒绝访问的情况：{'returnCode': '501', 'message': '非法IP', 'result': False}

  # 打印结果
  result = res.json()
  # print(result)
  if result is None:
    print('请检查输入信息是否正确')
  else:
    for dataNum in range(len(result['data'])):
      print("结果"+ str(len(result['data']) - dataNum),result['data'][dataNum]['context'])
