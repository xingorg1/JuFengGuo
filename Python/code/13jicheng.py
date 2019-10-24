class Chinese:
    eye = 'black'

    def eat(self):
        print('吃饭，选择用筷子。')

class Cantonese(Chinese):  
# 通过继承，Chinese类有的，Cantonese类也有
    pass

# 验证子类可以继承父类的属性和方法，进而传递给子类创建的实例
yewen = Cantonese()  
# 子类创建的实例，从子类那间接得到了父类的所有属性和方法
print(yewen.eye)  
# 子类创建的实例，可调用父类的属性
yewen.eat()  
# 子类创建的实例，可调用父类的方法


class Cat:
    tail = True
    
    def say(self):
        print('喵喵喵喵喵~')

class Ragdoll(Cat):
  pass

ragdoll = Ragdoll()
print(ragdoll.tail)
ragdoll.say()

# 阅读代码和注释，直接运行

print(isinstance(1,int))
# 判断1是否为整数类的实例
print(isinstance(1,str))

print(isinstance(1,(int,str)))
# 判断实例是否属于元组里几个类中的一个


# 阅读完代码再运行。
class Chinese:
    pass

class Cantonese(Chinese):
    pass

gonger = Chinese()
# 宫二，电影《一代宗师》女主，生于东北
yewen = Cantonese()
# 叶问，电影《一代宗师》男主，生于广东

print('\n验证1：子类创建的实例同时也属于父类')
print(isinstance(gonger,Chinese))  #true
print(isinstance(yewen,Chinese))  #true

print('\n验证2：父类创建的实例不属于子类。')
print(isinstance(gonger,Cantonese)) #false

print('\n验证3：类创建的实例都属于根类。')
print(isinstance(gonger,object))  #true
print(isinstance(yewen,object)) #true


# 先阅读代码和注释，然后直接运行代码。
class Earthman:
    eye_number = 2

# 中国人继承了地球人
class Chinese(Earthman):
    eye_color = 'black'

# 广东人继承了中国人，同时也继承了地球人。
class Cantonese(Chinese):
    pass

yewen = Cantonese()
print(yewen.eye_number)
print(yewen.eye_color)

""" 多重继承 """
class Su:
    born_city = 'Jiangsu'
    wearing = 'thick'  # 穿得较厚

    def diet(self):
        print('我们爱吃甜。')

class Yue:
    settle_city = 'Guangdong'
    wearing = 'thin'  # 穿得较薄

    def diet(self):
        print('我们吃得清淡。')

class Yuesu(Yue,Su):
    pass

xiaoming = Yuesu()
print(xiaoming.wearing)
print(xiaoming.born_city)
xiaoming.diet()

#练习
class C0:
  name = 'c0'

class C1:
  num = 1

class C2(C0):
  num = 2

class C3:
  name = 'c3'

class C4(C1,C2,C3):
  pass

c4 = C4()

print(c4.name) # c0?
print(c4.num) # 1

#类的定制
class Chinese:
    eye = 'black'

    def eat(self):
        print('吃饭，选择用筷子。')

class Cantonese(Chinese):  # 类的继承
    native_place = 'guangdong'  # 类的定制

    def dialect(self):  # 类的定制
        print('我们会讲广东话。')

yewen = Cantonese()
print(yewen.eye)
# 父类的属性能用
print(yewen.native_place)
# 子类的定制属性也能用
yewen.eat()
# 父类的方法能用
yewen.dialect()
# 子类的定制方法也能用


# 父类方法重写
class Chinese:

    def land_area(self,area):
        print('我们居住的地方，陆地面积是%d万平方公里左右。'% area)

class Cantonese(Chinese):
    # 间接对方法进行重写
    def land_area(self, area, rate = 0.0188):
        Chinese.land_area(self, area * rate)
        # 直接继承父类方法，再调整参数。

gonger = Chinese()
yewen = Cantonese()
gonger.land_area(960)
yewen.land_area(960)


# 阅读代码后运行
class Chinese:

    def land_area(self,area):
        print('我们居住的地方，陆地面积是%d万平方公里左右。' % area)

class Cantonese(Chinese):
    # 为参数 area 设置默认值。
    def land_area(self, area = 960, rate = 0.0188):
        Chinese.land_area(self, area * rate)

yewen = Cantonese()
yewen.land_area()
# 两个参数都有默认值，所以可以这么调用。

# 提示：初始化方法的定制，和一般的实例方法的定制是一样的。
class Chinese:
    def __init__(self, greeting='你好', place='中国'):
        self.greeting = greeting
        self.place = place

    def greet(self):
        print('%s！欢迎来到%s。' % (self.greeting, self.place))

# 请为子类完成定制，代码量：两行。
class Cantonese(Chinese):
  def __init__(self, greeting="雷猴", place="广州"):
    self.greeting = greeting
    self.place = place

  def greet(self):
    init = Chinese(self.greeting, self.place)
    init.greet()

contonese = Cantonese()
contonese.greet()

#参考
class Chinese:

    def __init__(self, greeting = '你好', place = '中国'):
        self.greeting = greeting
        self.place = place

    def greet(self):
        print('%s！欢迎来到%s。' % (self.greeting, self.place))

class Cantonese(Chinese):

    def __init__(self, greeting = '雷猴', place = '广东'):
        Chinese.__init__(self, greeting, place)
    
yewen = Cantonese()
yewen.greet()
    

yewen = Cantonese()
yewen.greet()