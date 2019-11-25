# 静态二维码
## 模块安装
pip install qrcode (mac中不成功，试试用pip3装)  
pip install Image  
## 错误1:文件名字千万不要叫qrcode.py呀
不然import python相当于引入自己的文件。以后单反import引入的模块名（如果非自己的模块），都要谨慎文件名不要与模块名重名

## 错误2：No moudle named 'Image'
在我们使用qrcode的时候，输入qr "Some test">test.png时发生错误，显示没有模块名叫 “Image”

我们查找原因,显示ModuleNotFoundError: No module named 'PIL'

所以我们用命令行安装模块pip install pillow

安装完成后,重新输入命令行qr "Some test">test.png，没有出现错误

这个过程说明qrcode模块是基于pillow模块的

# 动态二维码
[官网](https://pypi.org/project/MyQR/)  
[github](https://github.com/sylnsfar/qrcode/blob/master/README-cn.md)
## 模块安装
pip install myqr （win）  
sudo pip3 install myqr（mac）  

### 默认输出文件名是“ qrcode.png "，而默认存储位置是当前目录

### words必须是英文的？！

