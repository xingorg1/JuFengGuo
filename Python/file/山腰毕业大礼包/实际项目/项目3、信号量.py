import multiprocessing
import time

def fn(i, sem):
    with sem:
        print("子进程%d开始" % i)
        time.sleep(3)
        print("子进程%d结束" % i)


if __name__ == '__main__':
    # 信号量：允许的最大进程并发量
    sem = multiprocessing.Semaphore(3)

    for i in range(1, 21):
        p = multiprocessing.Process(target=fn, args=(i, sem))
        p.start()

