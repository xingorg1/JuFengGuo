# # 阅读最后三行代码，直接运行即可
# class Book:
 
#     def __init__(self, name, author, comment, state = 0):
#         self.name = name
#         self.author = author
#         self.comment = comment
#         self.state = state
 
#     def __str__(self):
#         status = '未借出'
#         if self.state == 1:
#             status = '已借出'
#         return '名称：《%s》 作者：%s 推荐语：%s\n状态：%s ' % (self.name, self.author, self.comment, status)
 
# class BookManager:
#     books = []
#     # 存储书籍的列表，每一个元素都是Book的实例对象
#     def __init__(self):
#         book1 = Book('惶然录','费尔南多·佩索阿','一个迷失方向且濒于崩溃的灵魂的自我启示，一首对默默无闻、失败、智慧、困难和沉默的赞美诗。')
#         book2 = Book('以箭为翅','简媜','调和空灵文风与禅宗境界，刻画人间之缘起缘灭。像一条柔韧的绳子，情这个字，不知勒痛多少人的心肉。')
#         book3 = Book('心是孤独的猎手','卡森·麦卡勒斯','我们渴望倾诉，却从未倾听。女孩、黑人、哑巴、醉鬼、鳏夫的孤独形态各异，却从未退场。',1)
#         self.books.append(book1)
#         self.books.append(book2)
#         self.books.append(book3)

# manager = BookManager()
# print(len(manager.books))
# # 打印列表长度
# for book in manager.books:
#     print(book)


# # 书籍对象
# class Book:
 
#     def __init__(self, name, author, comment, state = 0):
#         self.name = name
#         self.author = author
#         self.comment = comment
#         self.state = state

#     # 内置字符串方法，用于book实例化对象执行时打印信息
#     def __str__(self):
#         status = '未借出'
#         if self.state == 1:
#             status = '已借出'
#         return '名称：《%s》 作者：%s 推荐语：%s\n状态：%s ' % (self.name, self.author, self.comment, status)
 
# # 书籍管理系统
# class BookManager:

#     books = []

#     # 初始化
#     def __init__(self):
#         book1 = Book('惶然录','费尔南多·佩索阿','一个迷失方向且濒于崩溃的灵魂的自我启示，一首对默默无闻、失败、智慧、困难和沉默的赞美诗。')
#         book2 = Book('以箭为翅','简媜','调和空灵文风与禅宗境界，刻画人间之缘起缘灭。像一条柔韧的绳子，情这个字，不知勒痛多少人的心肉。')
#         book3 = Book('心是孤独的猎手','卡森·麦卡勒斯','我们渴望倾诉，却从未倾听。女孩、黑人、哑巴、醉鬼、鳏夫的孤独形态各异，却从未退场。',1)
#         self.books.append(book1)
#         self.books.append(book2)
#         self.books.append(book3)

#     # 菜单系统
#     def menu(self):
#         print('欢迎使用流浪图书管理系统，每本沉默的好书都是一座流浪的岛屿，希望你有缘发现并着陆，为精神家园找到一片栖息地。\n')
#         while True:
#             print('功能目录：\n1.查询所有书籍\n2.添加书籍\n3.借出书籍\n4.归还书籍\n5.退出系统\n')
#             choice = int(input('请输入数字选择对应的功能：'))
#             if choice == 1:
#                 self.show_all_book()
#                 # break
#             elif choice == 2:
#                 self.add_book()
#                 # break
#             elif choice == 3:
#               self.lend_book()
#             elif choice == 5:
#               print('退出成功！')
#               break

#     # 展示图书
#     def show_all_book(self):
#         for book in self.books:
#             print(book)
#             print('')

#     # 添加图书
#     def add_book(self):
#       print('请填写如下信息：')
#       name = input('书名：')
#       author = input('作者：')
#       comment = input('推荐语：')
#       book = Book(name,author, comment)
#       self.books.append(book)
#       print('书籍录入成功！\n')
      
#     # 借阅图书
#     def lend_book(self):
#         print('\n===现有可借图书目录如下：===')
#         index = 0
#         canLendNum = 0
#         for item in self.books:
#           if item.state == 0:
#             canLendNum += 1
#             print('序号:%d 书名:《%s》\n' %(index,item.name))
#           index += 1
#         if canLendNum == 0:
#           print('\n===暂无可借图书===')
#         else:
#           inputBookNum = True
#           while inputBookNum:
#             lendNum = int(input('===请输入要借阅书籍的序号：==='))
#             try:
#               if self.books[lendNum].state == 1:
#                 print('\n===该图书已被借出，请选择其他图书===')
#               else:
#                 self.books[lendNum].state = 1
#                 print('借阅成功！')
#                 inputBookNum = False
#             except IndexError as e:
#               print('\n===别随便乱输数字好嘛！看清楚可借图书只能填几===')


# manager = BookManager()
# manager.menu()


# 其他思路
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
    #存储书籍的列表，每一个元素都是Book的实例对象
    books = []
    def __init__(self):
        book1 = Book('惶然录','费尔南多·佩索阿','一个迷失方向且濒于崩溃的灵魂的自我启示，一首对默默无闻、失败、智慧、困难和沉默的赞美诗。')
        book2 = Book('以箭为翅','简媜','调和空灵文风与禅宗境界，刻画人间之缘起缘灭。像一条柔韧的绳子，情这个字，不知勒痛多少人的心肉。')
        book3 = Book('心是孤独的猎手','卡森·麦卡勒斯','我们渴望倾诉，却从未倾听。女孩、黑人、哑巴、醉鬼、鳏夫的孤独形态各异，却从未退场。',1)
        self.books.append(book1)
        self.books.append(book2)
        self.books.append(book3)
 
    def menu(self):
        print('欢迎使用流浪图书管理系统，每本沉默的好书都是一座流浪的岛屿，希望你有缘发现并着陆，为精神家园找到一片栖息地。\n')
        while True:
            print('1.查询所有书籍\n2.添加书籍\n3.借出书籍\n4.归还书籍\n5.退出系统\n')
            choice = int(input('请输入数字选择对应的功能：'))
            if choice == 1:
                self.show_all_book()
            elif choice == 2:
                self.add_book()
            elif choice == 3:
                self.lend_book()
            elif choice == 4:
                self.return_book()
            elif choice == 5:
                print('感谢使用！')
                break
 
    def show_all_book(self):
        for book in self.books:
            print(book)
            print('')

    def add_book(self):
        new_name = input('请输入书籍名称：')
        new_author =  input('请输入作者名称：')
        new_comment = input('请输入书籍推荐语：')
        new_book = Book(new_name, new_author, new_comment)
        self.books.append(new_book)
        print('书籍录入成功！\n')

    def check_book(self,name):
        for book in self.books:
            if book.name == name:
                 return book 
        else:
            return None

    def lend_book(self):
        name = input('\n请输入书籍的名称：')
        res = self.check_book(name)

        if res != None:
            if res.state == 1:
                print('===你来晚了一步，这本书已经被借走了噢===')
            else:
                print('===借阅成功，借了不看会变胖噢～===')
                res.state = 1
        else:
            print('===这本书暂时没有收录在系统里呢===')
    
    def return_book(self):
      name = input('\n请输入要归还书籍的名称：')
      res = self.check_book(name)
      if res != None:
          if res.state == 0:
              print('===这本书好像不是从我们这里借走的，你再核实一下吧===')
          else:
              print('===归还成功，有借有还、再借不难噢～===')
              res.state = 0
      else:
          print('===这本书暂时没有收录在系统里呢===')
 
manager = BookManager()
manager.menu()