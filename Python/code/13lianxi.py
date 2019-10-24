# 请先读懂代码，再运行。
class Student:
    # 初始化函数，为每个实例创建4个参数（其中后3个参数有默认值）
    def __init__(self, name, job=None, time=0.00, time_effective=0.00): 
        self.name = name
        self.job = job
        self.time = time
        self.time_effective = time_effective

    def count_time(self, hour, rate):
        self.time += hour
        self.time_effective += hour * rate  # 有效时间=投入时间×学习效率

student1 = Student('韩梅梅')
print(student1.job)
student1.count_time(10, 0.8)  # 学习效率为0.8
print(student1.time_effective)

#编程开发人员学 Python 的话，学习效率很高，默认为1。
#而且，job 的属性为 programmer。
class Student:
    def __init__(self, name, job=None, time=0.00, time_effective=0.00): 
        self.name = name
        self.job = job
        self.time = time
        self.time_effective = time_effective

    def count_time(self, hour, rate):
        self.time += hour
        self.time_effective += hour * rate

# 请你完成子类的定制（包括初始化方法和count_time函数）
class Programmer(Student):
  def __init__(self, name, job='programmer', time=0.00, time_effective=0.00):
    # Student.__init__(name, job, time, time_effective) #父类的方法调用时，记得传递self修改指针
    Student.__init__(self,name, job, time, time_effective) #父类的方法调用时，记得传递self修改指针

  def count_time(self, hour, rate = 1):
    # Student.count_time(hour,rate)
    Student.count_time(self,hour,rate)


# 通过两个实例，完成子类和父类的对比（可自行验证）
student1 = Student('韩梅梅')
student2 = Programmer('李雷')
print(student1.job)
student1.count_time(10, 0.8)
print('韩梅梅学习效率',student1.time_effective)

print(student2.job)
student2.count_time(10)
print('李雷学习效率',student2.time_effective)
