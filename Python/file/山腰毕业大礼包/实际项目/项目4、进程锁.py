import multiprocessing
import time
import random

def fn():
    time.sleep(random.randint(2, 5))
    print('子进程', multiprocessing.current_process().name)

def fn2(lock):
    pname = multiprocessing.current_process().name
    with lock:
        print("%s 加锁，开始执行代码.." % pname)
        time.sleep(random.randint(2, 5))
        print("%s 开锁，执行结束.." % pname)


if __name__ == '__main__':
    # 同步&异步
    # p = multiprocessing.Process(target=fn)
    # p2 = multiprocessing.Process(target=fn)
    # p.start()
    # # p.join()
    # p2.start()
    # # p2.join()

    # 进程锁
    lock = multiprocessing.Lock()
    p = multiprocessing.Process(target=fn2, args=(lock,))
    p2 = multiprocessing.Process(target=fn2, args=(lock,))
    p.start()
    p2.start()


