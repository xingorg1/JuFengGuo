print(str(123))
print(str('123'))
print(str(12.3))
print(str(True))
print(int('123'))
for i in '123':  # for循环可以遍历字符串
    print('for循环可以遍历字符串',i)
for i in range(3): # for循环遍历整数
  print('for循环遍历整数',i)
obj = {'name': '12', 'age': '2'}
for i1 in obj:
    print('for循环可以遍历字典',i1)
for i2 in range(2):  # range遍历从0开始
    print('-', i2)
print('a' < 'b')  # 字符串可以比较大小，应该也是转ascii码
print(12 * 0.5)
a = print(123)  # print的返回值是None
print(a)
print(len(''))
# print(len(123)) # 整数、浮点数、布尔值等object都没有len方法
# print(len(12.3))
# print(len(True))
for i in [8, 9]:
    print(i, '==')  # 8、9
else:
    print('haha')  # haha
if 4 < 2:
    print('if')
elif 3 > 3:
    print('elif')
else:
    print('else')

for i in range(2):
    print(i)  # 0、1

a = 0
while a < 2:
    print('不是无限死循环')
    a += 1

print('打印店')


def hanshu(a, b):
    c = a * b
    return c


result = hanshu(1, 2)
print(result)

# 类


class Person:
    mytype = '人类'  # 父类的属性

    def __init__(self):  # 初始化init函数，不是constructor函数
        pass

    def eating(self):  # 是self指向实例化对象，不是this
        print(self.mytype + self.name + '生下来就会吃饭')


class Gjf(Person):  # 继承写法不一致，不用extends，直接括号继承
    def __init__(self, name, age=18):
        self.name = name
        self.age = age

    def greeting(self, yourName):
        print('%s岁的%s向%s说hello！' %
              (self.age, self.name, yourName))  # 字符串的拼接写法不一致


gjf = Gjf('小石头')  # 没有new构造函数，直接调用构造函数即可
gjf.eating()
gjf.greeting('郭菊锋')

a = list('123')
print(a)

# 类型获取 - type()


def a():
    pass


print(type('str'))  # <class 'str'>
print(type(1))      # <class 'int'>
print(type(1.3))    # <class 'float'>
print(type(True))   # <class 'bool'>
print(type(None))   # <class 'NoneType'>
print(type({}))     # <class 'dict'>
print(type([]))     # <class 'list'>
print(type((1, 2, 3)))
print(type(a))      # <class 'function'>
b = ["1", 2]
print(isinstance(b, list))
print('-'.join(str(b)))
print('-'.join(['d', 'o', 'g']))
print(type(('1')))

# 类型判断 isinstance
to_addr = ['xing.org1@outlook.com', '702004176.qq.com']
if isinstance(to_addr, list):
    to_addr = ','.join(to_addr)
    print(to_addr)
a = 1
b = [1, 2, 3, 4]
c = (1, 2, 3, 4)
d = {'a': 1, 'b': 2, 'c': 3}
e = "abc"
if isinstance(a, int):
    print("a is int")  # a is int
else:
    print("a is not int")
if isinstance(b, list):
    print("b is list")  # b is list
else:
    print("b is not list")
if isinstance(c, tuple):
    print("c is tuple")  # c is tuple
else:
    print("c is not tuple")
if isinstance(d, dict):
    print("d is dict")  # d is dict
else:
    print("d is not dict")
if isinstance(e, str):
    print("e is str")  # e is str
else:
    print("e is not str")

# 判断为None的几种方法


def fun():
    return None


a = fun()

# 1)
if a is None:
    print('a is None')  # a is None
else:
    print('a is not None')

# 2）
if not a:
    print('a 的类型是 None')  # a 的类型是 None
else:
    print('a 不是 None')

# 3)
if not (a is None):
    print('a is None', '是错的')
else:
    print('a is None', '是对的')  # a is None 是对的
