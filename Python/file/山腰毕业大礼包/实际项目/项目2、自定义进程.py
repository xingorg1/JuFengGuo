import multiprocessing
import os

class MyProcess(multiprocessing.Process):
    def __init__(self, name, url):
        super().__init__()
        self.name = name
        self.url = url

    def run(self):
        print("子进程: ", self.name, self.url)
        print("当前进程:", self.pid)  # 进程id
        print("当前进程:", os.getpid())  # 进程id
        print("当前进程的父进程:", os.getppid())  # 父进程

if __name__ == '__main__':
    p = MyProcess('进程1', 'http://www.ifeng.com')
    p.start()
    print("主进程id:", os.getpid())


