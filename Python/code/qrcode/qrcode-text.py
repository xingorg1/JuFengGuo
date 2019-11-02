import qrcode
site = '/Users/guojufeng/Documents/GitHub/JuFengGuo/Python/code/qrcode/'
imgText = input("输入你要制作二维码的文案：")
imgName = input("设置图片名称：")
imgType = input("设置图片格式（png or jpg）：")

img = qrcode.make(imgText)

img.save(site + imgName + "." + imgType)
img.show()  # 打开图片