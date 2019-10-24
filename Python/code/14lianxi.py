class Book:
 
    def __init__(self, name, author, comment, state = 0):
        self.name = name
        self.author = author
        self.comment = comment
        self.state = state
 
# 创建一个Book类的子类 FictonBook
class FictonBook(Book):
    # 继承并定制父类的初始化方法，增加默认参数 type = '虚构类'，让程序能够顺利执行。
    def __init__(self,name, author, comment, state = 0, type = '虚构类'):
      self.type = type
      Book.__init__(self, name, author, comment,state)

    def __str__(self):
        status = '未借出'
        if self.state == 1:
            status = '已借出'
        return '类型：%s 名称：《%s》 作者：%s 推荐语：%s\n状态：%s ' % (self.type, self.name, self.author, self.comment, status)


book = FictonBook('囚鸟','冯内古特','我们都是受困于时代的囚鸟',1 )
print(book)

'''
让打印的结果为:
类型: 虚构类 名称：《囚鸟》 作者：冯内古特 推荐语：我们都是受困于时代的囚鸟
状态：未借出
'''
