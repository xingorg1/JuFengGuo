# 请为下列代码加上注释，然后再运行。
# 定义一个类
class Chinese:
   # 类的属性eye
    eye = 'black'
    # 类的init方法，初始化会执行，第一个self固定参数必填
    def __init__(self,hometown):
        # self上的属性hometown，以后会成为实例化对象的属性
        self.hometown = hometown
        print('程序持续更新中……')
    # 类的born方法
    def born(self):
        print('我生在%s。' % self.hometown)
# 构造得到实例化对象
wufeng = Chinese('广东')

print(wufeng.eye)
# 调用实例化对象的方法
wufeng.born()


class Chinese:  # 类的创建
    eye = 'black'  # 类属性的创建

    def __init__(self,hometown):  # 类的初始化方法
        self.hometown = hometown  # 实例属性的创建
        print('程序持续更新中……')  # 初始化中的语句
    
    def born(self):  # 实例方法的创建
        print('我生在%s。'%(self.hometown))  # 方法的具体语句

wufeng = Chinese('广东')  # 类的实例化
print(wufeng.eye)  # 打印实例的属性（从类传递的）
wufeng.born()  # 实例方法的调用