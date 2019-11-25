# 安装新模块包
# pip install qrcode (mac中不成功，试试用pip3装)
# pip install Image
import qrcode  # 模块导入

site = '/Users/guojufeng/Documents/GitHub/JuFengGuo/Python/code/qrcode/'
imgUrl = input("输入你要制作二维码的地址：")
imgName = input("设置图片名称：")
imgType = input("设置图片格式（png or jpg）：")
#  调用qrcode的make()方法传入url或者想要展示的内容
img = qrcode.make(imgUrl)
#  写入文件
with open(site + imgName + '.' + imgType, 'wb') as f:
    img.save(f)
    img.show()  # 打开图片
