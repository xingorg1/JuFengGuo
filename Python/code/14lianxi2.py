class Book:
 
    def __init__(self, name, author, comment, state = 0):
        self.name = name
        self.author = author
        self.comment = comment
        self.state = state
 
    def __str__(self):
        status = '未借出'
        if self.state == 1:
            status = '已借出'
        return '名称：《%s》 作者：%s 推荐语：%s\n状态：%s ' % (self.name, self.author, self.comment, status)
 
class BookManager:

    authors = []
    # 创建一个存放作者名的列表
    def __init__(self):
        book1 = Book('撒哈拉的故事','三毛','我每想你一次，天上便落下一粒沙，从此便有了撒哈拉。')
        book2 = Book('梦里花落知多少','三毛','人人都曾拥有荷西，虽然他终会离去。')
        book3 = Book('月亮与六便士','毛姆','满地都是六便士，他却抬头看见了月亮。')
        self.books = [book1,book2,book3]
        # 将三个实例放在列表books里
        self.authors.append(book1.author)
        self.authors.append(book2.author)
        self.authors.append(book3.author)
        # 将三个实例的作者名添加到列表author里
 
    def menu(self):
        while True:
            print('1.查询书籍')
            choice = int(input('请输入数字选择对应的功能：'))
            if choice == 1:
                self.show_author_book()
                # 调用方法
            else:
                print('感谢使用！')
                break
 
    # def show_author_book(self):
    #     author = input('你想找谁的书呢？')
    #     num = 0
    #     # 请在此处补充该方法的代码
    #     for item in self.books:
    #       if item.author == author:
    #         num += 1
    #         print('%s \n' %(item))
    #     if num == 0:
    #       print('很可惜，我们暂时没有收录这位作者的作品')
    
    def show_author_book(self):
        author = input('请输入想查询作家的名称：')
        if author in self.authors:
            print(author + '的作品有：')
            for book in self.books:
                if book.author == author:
                    print(book)
        else:
            print('很可惜，我们暂时没有收录这位作者的作品')

manager = BookManager()
manager.menu()

'''
一个思路：
1. 先用条件判断语句判断该作者在不在列表authors里，如果不在就打印'很可惜，我们暂时没有收录这位作者的作品'
2. 如果在，就遍历列表books的每个实例，当实例属性author与输入的作者名相等，就打印该实例      
'''
