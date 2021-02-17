# express

## docs

[官网](https://www.expressjs.com.cn/)

[中文文档](http://expressjs.jser.us/)

## error logs
Use `node --trace-deprecation ...` to show where the warning was created

Error: Most middleware (like logger) is no longer bundled with Express and must be installed separately. Please see https://github.com/senchalabs/connect#middleware.

# knowledges

## settings
下面的内建的可以改变Express行为的设置

- env 运行时环境，默认为 process.env.NODE_ENV 或者 "development"
- trust proxy 激活反向代理，默认未激活状态
- jsonp callback name 修改默认?callback=的jsonp回调的名字
- json replacer JSON replacer 替换时的回调, 默认为null
- json spaces JSON 响应的空格数量，开发环境下是2 , 生产环境是0
- case sensitive routing 路由的大小写敏感, 默认是关闭状态， "/Foo" 和"/foo" 是一样的
- strict routing 路由的严格格式, 默认情况下 "/foo" 和 "/foo/" 是被同样对待的
- view cache 模板缓存，在生产环境中是默认开启的
- view engine 模板引擎
- views 模板的目录, 默认是"process.cwd() + ./views"


