module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index); // 基于@koa/router。home指控制器，index指home控制器里的对应action函数
  router.get('/news', controller.news.list);
  // 或 router.get('/news', "news.list"); 第二种写法，传递一个字符串
};
