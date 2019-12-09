import multiprocessing
import time

def fn(*args):
    time.sleep(3)
    print("子进程:", args)
    # 进程名
    print(multiprocessing.current_process().name)  # Process-1
    # 进程id
    print(multiprocessing.current_process().pid)


if __name__ == '__main__':
    # 创建进程
    p = multiprocessing.Process(target=fn, args=('李小璐', "喜欢做头发"))
    # p.daemon = True  # 守护进程
    p.start()
    p.join()  # 等待p进程执行完毕后，再执行后面的代码，阻塞

    p2 = multiprocessing.Process(target=fn, args=("马蓉", "喜欢宋哲"))
    p2.start()
    p2.join()


