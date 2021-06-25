# 1
# def a():
#   name = '销售投资'
# print(name)

# # 2
# d = {}
# d[(1,2)] = ({3, (4)})

# x =list(range(9));
# del x[:2];
# print(x);

# myName = ['小石头', 'xing.org1^', 181, True]
# print(myName[:2]) # ['小石头', 'xing.org1^']

# a = 'h';
# b = 'a';
# print(a*2);
# # print(a[4])
# print(a, b)

# import random

# print(random.sample([1,2,3,4,5,6], 3))
# txt = open('book.txt', 'r')
# print(txt)

# import  random
# fr = ['a','b',]

# while True:
#      print('1234')
#      continue
# else:
#     print('xxxx')

# i = True
# while i :
#      print('2222')
#      i =False
# else:
#     print('yyy')


# b = '严峻'
# def name():
#   print('%s喜欢冲浪和潘安。'%b)

# name()

# def name1():
#   global b1
#   b1 = '严峻'

# name1()

# print('%s喜欢冲浪和潘安。'%b1)

lower = 5
upper = 15
# 5-134之间的质数
# 质数是指在大于1的自然数中，除了1和它本身以外不再有其他因数的自然数。
# 质数只有两个正因数（1和自己）的自然数即为质数

for num in range(lower, upper): # 1 循环 5 到 134 （讲解range、for循环的用法）
  print(num, '1');
  if num > 1:
    print(num, '2');
    for i in range(2, num): # 2 range(2, num) 就是选取范围，除了1和他本身。
      print(i, '3');
      if(num % i) == 0: # 3 如果还能有其他因数，
        print(i, '4');
        break  # 4 说明不是质数，直接break，跳出本次循环，接下来的i的判断就没必要了
    else: #
      print(num, '----')
print('end')


# 本题是用来求解5到134之间的所有质数的。


# 质数的定义是指在大于1的自然数中，除了1和它本身以外不再有其他因数的自然数。并且质数只有两个正因数（1和自己），也就是只能被1和自身整除的数。

# 题目中开始定义了两个变量lower为5和upper为15。
# 在第一行中（注释1处）使用了for循环语法，他的作用是循环的将x - y两个数之间的所有数据逐个取出来赋值给num变量进行使用。
# range方法的语法是range(start, stop[, step])，
# 参数说明：
# 第一个参数 start: 表示计数从 start 开始。如果range
# 里不写参数默认是从 0 开始。【题目中写的range(lower, ),也就是range(5, )，表示从5开始】
# 第二个参数 stop: 表示计数到 stop 结束，但不包括 stop。例如题目中：range(lower, upper * 9)表示从range(5, 15 * 9)。15 * 9 = 135，但是range的stop是不包括的，也就是不包括135，循环5到134.
# 第三个参数 step：步长，默认为1。题目中没有填写，就是1，表示从5开始，每次加1，直到134。

# 根据质数的定义，质数需要大于1，所以代码的第二行，有一个if num > 1 的判断，如果条件不成立，则进行下一次循环。

# 第三行（注释2处）又有一个for循环，用来循环2到当前num之间的数（当然，不包括让前num），比如当前num为5时，for循环将循环并依次取出2、3、4三个数，赋值给i变量。当注释2处第一次循环时，此时num是5，i为2；第二次循环时，num还是5，i为3……

# 在第四行（注释3处）我们用if进行了一个判断，判断之前我们先使用%运算符进行num和i的取余计算。含义就是看num除以i的余数是多少。如果余数为0，则说明num能被i整取。（比如当前num是6、i是2，则说明6能被2整除）因为质数的定义是只能被1和自身整除。
# 如果这个条件成立，则说明这个数除了1和自身外，还能被其他数整除，说明他不是质数，后边的循环判断就没必要了。于是就会走进注释4处，使用break跳出当前循环（跳出第二行的循环）

# 当注释2的所有for循环全部完毕，都没有if条件成立的话，说明这个数只能被1和自身整除，就是个质数。所以会走到最后一个else处，打印出当前的数（num）。


