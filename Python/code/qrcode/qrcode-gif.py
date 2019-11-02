# 生成动态二维码
import qrcode
import os
import imageio
site = '/Users/guojufeng/Documents/GitHub/JuFengGuo/Python/code/qrcode/'

def produce_png():
    data = [u'支付宝红包:nxt2',
            u'支付宝红包:nxt1',
            u'支付宝红包:测试动图',
            u'支付宝红包:pre1',
            u'支付宝红包:pre2',
            u'支付宝红包:pre3']
    for i, txt in enumerate(data):
        qr = qrcode.QRCode(version=3,
                           error_correction=qrcode.constants.ERROR_CORRECT_L,
                           box_size=10,
                           border=4,)
        qr.add_data(txt)
        qr.make()
        img = qr.make_image()
        img.save(str(i)+'.png')

def produce_gif():
    images = []
    filenames = sorted((fn for fn in os.listdir('.') if fn.endswith('.png')))
    for filename in filenames:
        images.append(imageio.imread(filename))
    imageio.mimsave(site + 'gif-test.gif', images, duration=1)
produce_png()
produce_gif()
# ————————————————
# 版权声明：本文为CSDN博主「xiao_huocai」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
# 原文链接：https://blog.csdn.net/xiao_huocai/article/details/78875905