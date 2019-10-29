print(int('123'))
for i in '123': #for循环可以遍历字符串
  print(i)
# for i in 12: # for循环不能遍历整数
#   print(i)
obj = {'name':'12','age': '2'}
for i1 in obj:
  print(i1)
for i2 in range(2): # range遍历从0开始
  print('-',i2)
print('a' < 'b') # 字符串可以比较大小，应该也是转ascii码
print(12 * 0.5)
a = print(123) # print的返回值是None
print(a)
print(len(''))
# print(len(123)) # 整数、浮点数、布尔值等object都没有len方法
# print(len(12.3))
# print(len(True))
for i in [8,9]:
	print(i,'==') #8、9
else:
  print('haha') #haha
if 4 < 2:
	print('if')
elif 3 > 3: 
	print('elif')
else:
  print('else')

for i in range(2):
  print(i) #0、1

a = 0
while a < 2:
  print('不是无限死循环')
  a += 1

print('打印店')

def hanshu(a,b):
  c = a * b
  return c
result = hanshu(1,2)
print(result)

class Person:
  mytype = '人类'  # 父类的属性
  def __init__(self): #初始化init函数，不是constructor函数
    pass
  def eating(self): #是self指向实例化对象，不是this
    print(self.mytype + self.name + '生下来就会吃饭')

class Gjf(Person): #继承写法不一致，不用extends，直接括号继承
  def __init__(self,name,age = 18):
    self.name = name
    self.age = age
  def greeting(self,yourName):
    print('%s岁的%s向%s说hello！' %(self.age,self.name,yourName)) # 字符串的拼接写法不一致

gjf = Gjf('小石头') #没有new构造函数，直接调用构造函数即可
gjf.eating()
gjf.greeting('郭菊锋')
  
a = list('123')
print(a)
