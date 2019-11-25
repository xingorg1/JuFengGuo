# 先导入模块
from MyQR import myqr
site = '/Users/guojufeng/Documents/GitHub/JuFengGuo/Python/code/qrcode/'
imgText = '''世情薄，人情恶，雨送黄昏花易落。晓风干，泪痕残，欲笺心事，独语斜阑。难，难，难！人成各，今非昨，病魂常似秋千索。角声寒，夜阑珊，怕人寻问，咽泪装欢。瞒，瞒，瞒！'''

# myqr.run(
#     words='ceshi',  # 扫描二维码后，显示的内容，或是跳转的链接
#     version=5,  # 设置容错率
#     level='H',  # 控制纠错水平，范围是L、M、Q、H，从左到右依次升高
#     picture=site+'mygif.gif',  # 图片所在目录，可以是动图
#     colorized=True,  # 黑白(False)还是彩色(True)
#     contrast=1.0,  # 用以调节图片的对比度，1.0 表示原始图片。默认为1.0。
#     # brightness=1.0,  # 用来调节图片的亮度，用法同上。
#     save_name=site + 'newgit.gif',  # 控制输出文件名，格式可以是 .jpg， .png ，.bmp ，.gif
# )

myqr.run(
    words="Every mistake is your own unique way of getting to where you need to be.",
    # version=5,
    # level='H',
    picture=site+'mygif.gif',
    colorized=True,
    contrast=1.0,
    brightness=1.0,
    # save_name='Python.gif',
    # -d=site
)
# 默认输出文件名是“ qrcode.png "，而默认存储位置是当前目录
print('保存成功，请去根目录检查')

myqr.run(
    words="xing.org1",
    # version=5,
    # level='H',
    picture=site+'mygif2.gif',
    colorized=True,
    contrast=1.0,
    brightness=1.0,
    save_name='mygif2-text.gif',
    # -d=site
)
# 默认输出文件名是“ qrcode.png "，而默认存储位置是当前目录
print('保存成功，请去根目录检查')