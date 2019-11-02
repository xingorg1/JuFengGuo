# 生成中间带图标的二维码
# import matplotlib.pyplot as plt
from PIL import Image
import qrcode

site = '/Users/guojufeng/Documents/GitHub/JuFengGuo/Python/code/qrcode/'
logo = site + 'head.jpeg'

# imgText = input("输入要展示的文案：")
imgText = '''
世情薄，人情恶，雨送黄昏花易落。晓风干，泪痕残，欲笺心事，独语斜阑。难，难，难！\n
人成各，今非昨，病魂常似秋千索。角声寒，夜阑珊，怕人寻问，咽泪装欢。瞒，瞒，瞒！
'''
# imgName = input("给图片命名：")
imgName = '无语泪阑干'
# imgType = input("你想保存为什么格式的(png or jpg)：")
imgType = 'png'
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=5,
    border=4,
)
# 添加数据
qr.add_data(imgText)
# 填充数据
qr.make(fit=True)

# 生成图片
img = qr.make_image(fill_color="tomato", back_color="white")
# img = qrcode.make(imgText)
# 添加logo，打开logo照片
icon = Image.open(site + "head.jpeg")
# 获取图片的宽高
img_w, img_h = img.size
# 参数设置logo的大小
factor = 5
size_w = int(img_w / factor)
size_h = int(img_h / factor)
icon_w, icon_h = icon.size
if icon_w > size_w:
    icon_w = size_w
if icon_h > size_h:
    icon_h = size_h
# 重新设置logo的尺寸
icon = icon.resize((icon_w, icon_h), Image.ANTIALIAS)
# 得到画图的x，y坐标，居中显示
w = int((img_w - icon_w) / 2)
h = int((img_h - icon_h) / 2)
# 黏贴logo照
img.paste(icon, (w, h), mask=None)
# 终端显示图片
# plt.imshow(img)
# plt.show()
# 保存img
img.save(site + imgName + '.' + imgType)
print('制作成功！！')
img.show()



# if __name__ == '__main__':
#     getQRcode("世情薄，人情恶，雨送黄昏花易落。晓风干，泪痕残，欲笺心事，独语斜阑。"
#               "难，难，难！人成各，今非昨，病魂常似秋千索。角声寒，夜阑珊，怕人寻问，咽泪装欢。瞒，瞒，瞒！", 'my.png')
