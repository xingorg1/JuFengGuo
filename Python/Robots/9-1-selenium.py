# 体验
# 本地Chrome浏览器设置方法
from selenium import  webdriver  #从selenium库中调用webdriver模块
import time

driver = webdriver.Chrome() # 设置引擎为Chrome，真实地打开一个Chrome浏览器。（driver在这里是一个实例化的浏览器，因此，就是通过这个浏览器打开网页。）
driver.get('https://localprod.pandateacher.com/python-manuscript/hello-spiderman/')  # 打开网页（get(URL)是webdriver的一个方法，它的使命是为你打开指定URL的网页。）
time.sleep(2)

teacher = driver.find_element_by_id('teacher')
teacher.send_keys('必须是吴枫呀')
assistant = driver.find_element_by_name('assistant')
assistant.send_keys('都喜欢')
time.sleep(1)
button = driver.find_element_by_class_name('sub')
time.sleep(1)
button.click()
time.sleep(1)
driver.close() # 关闭浏览器驱动，每次调用了webdriver之后，都要在用完它之后加上一行driver.close()用来关闭它。使用selenium调用了浏览器之后也要记得关闭浏览器。