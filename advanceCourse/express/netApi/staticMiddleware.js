// 静态资源中间件
/* 伪代码
如果是api/开头的地址，说明是接口，向后移交next
如果非api/开头的地址，说明要请求静态资源。send返回静态资源
  如果静态资源不存在，向后移交next */