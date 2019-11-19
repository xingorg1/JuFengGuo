# 求绝对值
import math


def abs1(num):
    num = float(num)
    if num >= 0:
        return num
    else:
        return -num


print(abs1(1))
print(abs1(-1))
print(abs1('-23.5'))


def abs2(num):
    return abs(float(num))


print(abs2(1.4))
print(abs2(-1.2))
print(abs2('-235'))


def abs3(num):
    return math.fabs(float(num))


print(abs3(444.4))
print(abs3(-234.2))
print(abs3('-234.2'))
