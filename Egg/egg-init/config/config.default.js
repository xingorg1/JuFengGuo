// 默认配置
exports.keys = "cookie"; // 秘钥，用于加密cookie
exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks',
  },
};
exports.news = {
  pageSize: 5,
  serverUrl: 'https://hacker-news.firebaseio.com/v0',
};

// add middleware robot
exports.middleware = [
  'robot'
];

// robot's configurations
exports.robot = {
  ua: [
    /curl/i,
    /Baiduspider/i,
  ]
};