
# 使用多进程爬取深圳所有区的房源，并分别保存到单独的以区为文件名的txt中，如: 南山区.txt
# https://sz.lianjia.com/ershoufang/
import requests
from lxml import etree
import json
import time
import multiprocessing

headers = {
    'User-Agent': "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"
}


# 先获取所有区
def get_area_list():
    url = "https://sz.lianjia.com/ershoufang/"
    response = requests.get(url, headers=headers)
    content = response.text
    mytree = etree.HTML(content)
    area_list = mytree.xpath('//div[@data-role="ershoufang"]/div/a')
    areas = []
    for area in area_list:
        name = area.xpath('./text()')[0]
        href = area.xpath('./@href')[0]
        href = "https://sz.lianjia.com" + href
        areas.append({"name": name, "href": href})
    return areas

# 获取每个区的数据
def get_area_data(url, name, sem):
    # 获取某一个区总页数
    total_page = get_totalpage(url)
    for page in range(1, 11):
        get_page(page, url, name, sem)

# 获取某一个区总页数
def get_totalpage(url):
    response = requests.get(url, headers=headers)
    content = response.text

    mytree = etree.HTML(content)
    page_data = mytree.xpath('//div[@class="page-box house-lst-page-box"]/@page-data')[0]
    json_obj = json.loads(page_data)
    total_page = json_obj.get('totalPage')

    return int(total_page)

# 获取每一页数据
def get_page(page, url, name, sem):
    with sem:
        url = url + "/pg%d" % page
        response = requests.get(url, headers=headers)
        content = response.text
        mytree = etree.HTML(content)
        li_list = mytree.xpath('//ul[@class="sellListContent"]/li[@class="clear LOGCLICKDATA"]')
        for li in li_list:
            img = li.xpath('./a/img[2]/@src')[0]
            title = li.xpath('./div[@class="info clear"]/div[@class="title"]/a/text()')[0]
            print(url, "第%d页" % page, title)

            # 分区写入文件
            with open('sz/%s.txt'%name, 'a', encoding='utf-8') as fp:
                string = str((url, "第%d页" % page, title)) + "\n"
                fp.write(string)
                fp.flush()


if __name__ == '__main__':

    # 先获取区
    area_list = get_area_list()

    start = time.time()

    # 多进程爬取每个区的房源
    sem = multiprocessing.Semaphore(5)
    p_list = []
    for area in area_list:
        # get_area_data(area['href'], area['name'])
        p = multiprocessing.Process(target=get_area_data, args=(area['href'], area['name'], sem))
        p.start()
        p_list.append(p)

    # 保证所有进程都执行完毕后，才执行后面的代码
    for p in p_list:
        p.join()

    end = time.time()
    print("消耗时间：", end-start)


