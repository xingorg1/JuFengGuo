控制器中的this都有啥？以home 控制器为例：
# HomeController
```js
{
  ctx: {
    request: { method: 'GET', url: '/', header: [Object] },
    response: { status: 200, message: 'OK', header: [Object: null prototype] },
    app: {
      env: 'local',
      name: 'egg-init',
      baseDir: '/Users/guojufeng/Documents/GithubCode/JuFengGuo/advanceCourse/Egg/egg-init',
      subdomainOffset: 2,
      config: '<egg config>',
      controller: '<egg controller>',
      httpclient: '<egg httpclient>',
      loggers: '<egg loggers>',
      middlewares: '<egg middlewares>',
      router: '<egg router>',
      serviceClasses: '<egg serviceClasses>'
    },
    originalUrl: '/',
    req: '<original node req>',
    res: '<original node res>',
    socket: '<original node socket>'
  },
  app: {
    env: 'local',
    name: 'egg-init',
    baseDir: '/Users/guojufeng/Documents/GithubCode/JuFengGuo/advanceCourse/Egg/egg-init',
    subdomainOffset: 2,
    config: '<egg config>',
    controller: '<egg controller>',
    httpclient: '<egg httpclient>',
    loggers: '<egg loggers>',
    middlewares: '<egg middlewares>',
    router: '<egg router>',
    serviceClasses: '<egg serviceClasses>'
  },
  config: {
    session: {
      maxAge: 86400000,
      key: 'EGG_SESS',
      httpOnly: true,
      encrypt: true,
      overwrite: true,
      signed: true,
      autoCommit: true,
      encode: [Function: encode],
      decode: [Function: decode],
      genid: [Function]
    },
    security: {
      domainWhiteList: [],
      protocolWhiteList: [],
      defaultMiddleware: 'csrf,hsts,methodnoallow,noopen,nosniff,csp,xssProtection,xframe,dta',
      csrf: [Object],
      xframe: [Object],
      hsts: [Object],
      dta: [Object],
      methodnoallow: [Object],
      noopen: [Object],
      nosniff: [Object],
      referrerPolicy: [Object],
      xssProtection: [Object],
      csp: [Object],
      ssrf: [Object],
      _protocolWhiteListSet: [Set]
    },
    helper: { shtml: {} },
    jsonp: { limit: 50, callback: [Array], csrf: false },
    onerror: {
      errorPageUrl: '',
      appErrorFilter: null,
      templatePath: '/Users/guojufeng/Documents/GithubCode/JuFengGuo/advanceCourse/Egg/egg-init/node_modules/egg-onerror/lib/onerror_page.mustache'
    },
    i18n: {
      defaultLocale: 'en_US',
      dirs: [Array],
      queryField: 'locale',
      cookieField: 'locale',
      cookieDomain: '',
      cookieMaxAge: '1y',
      functionName: '__'
    },
    watcher: { type: 'development', eventSources: [Object] },
    customLogger: { scheduleLogger: [Object] },
    schedule: { directory: [] },
    multipart: {
      mode: 'stream',
      autoFields: false,
      defaultCharset: 'utf8',
      fieldNameSize: 100,
      fieldSize: 102400,
      fields: 10,
      fileSize: 10485760,
      files: 10,
      fileExtensions: [],
      whitelist: null,
      tmpdir: '/var/folders/4z/tjq__y_13r55yyhcw8h276rw0000gp/T/egg-multipart-tmp/egg-init',
      cleanSchedule: [Object]
    },
    development: {
      watchDirs: [],
      ignoreDirs: [],
      fastReady: false,
      reloadOnDebug: true,
      overrideDefault: false,
      overrideIgnore: false
    },
    logrotator: {
      filesRotateByHour: null,
      hourDelimiter: '-',
      filesRotateBySize: null,
      maxFileSize: 52428800,
      maxFiles: 10,
      rotateDuration: 60000,
      maxDays: 31
    },
    static: {
      prefix: '/public/',
      dir: '/Users/guojufeng/Documents/GithubCode/JuFengGuo/advanceCourse/Egg/egg-init/app/public',
      dynamic: true,
      preload: false,
      buffer: false,
      maxFiles: 1000
    },
    view: {
      root: [Array],
      cache: false,
      defaultExtension: '.html',
      defaultViewEngine: 'nunjucks',
      mapping: [Object]
    },
    nunjucks: {
      autoescape: true,
      throwOnUndefined: false,
      trimBlocks: false,
      lstripBlocks: false,
      cache: false
    },
    env: 'local',
    name: 'egg-init',
    keys: 'cookie',
    cookies: {},
    proxy: false,
    maxIpsCount: 0,
    maxProxyCount: 0,
    protocolHeaders: 'x-forwarded-proto',
    ipHeaders: 'x-forwarded-for',
    hostHeaders: '',
    pkg: {
      name: 'egg-init',
      version: '1.0.0',
      description: '',
      main: 'index.js',
      scripts: [Object],
      author: 'xingorg1',
      license: 'ISC',
      dependencies: [Object],
      devDependencies: [Object]
    },
    baseDir: '/Users/guojufeng/Documents/GithubCode/JuFengGuo/advanceCourse/Egg/egg-init',
    HOME: '/Users/guojufeng',
    rundir: '/Users/guojufeng/Documents/GithubCode/JuFengGuo/advanceCourse/Egg/egg-init/run',
    dump: { ignore: [Set] },
    confusedConfigurations: {
      bodyparser: 'bodyParser',
      notFound: 'notfound',
      sitefile: 'siteFile',
      middlewares: 'middleware',
      httpClient: 'httpclient'
    },
    notfound: { pageUrl: '' },
    siteFile: {
      '/favicon.ico': <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 00 ca 00 00 00 ca 08 06 00 00 00 e4 65 df a8 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 18 f9 ... 6413 more bytes>
    },
    bodyParser: {
      enable: true,
      encoding: 'utf8',
      formLimit: '1mb',
      jsonLimit: '1mb',
      textLimit: '1mb',
      strict: true,
      queryString: [Object],
      onerror: undefined,
      detectJSON: undefined,
      returnRawBody: true
    },
    logger: {
      dir: '/Users/guojufeng/Documents/GithubCode/JuFengGuo/advanceCourse/Egg/egg-init/logs/egg-init',
      encoding: 'utf8',
      env: 'local',
      level: 'INFO',
      consoleLevel: 'INFO',
      disableConsoleAfterReady: false,
      outputJSON: false,
      buffer: true,
      appLogName: 'egg-init-web.log',
      coreLogName: 'egg-web.log',
      agentLogName: 'egg-agent.log',
      errorLogName: 'common-error.log',
      coreLogger: [Object],
      allowDebugAtProd: false,
      type: 'application'
    },
    httpclient: {
      enableDNSCache: false,
      dnsCacheLookupInterval: 10000,
      dnsCacheMaxLength: 1000,
      request: [Object],
      httpAgent: [Object],
      httpsAgent: [Object]
    },
    meta: { enable: true, logging: false },
    coreMiddleware: [
      'meta',
      'siteFile',
      'notfound',
      'static',
      'bodyParser',
      'overrideMethod',
      'session',
      'securities',
      'i18n',
      'eggLoaderTrace'
    ],
    workerStartTimeout: 600000,
    serverTimeout: null,
    cluster: { listen: [Object] },
    clusterClient: { maxWaitTime: 60000, responseTimeout: 60000 },
    onClientError: null,
    news: { pageSize: 5, serverUrl: 'https://hacker-news.firebaseio.com/v0' },
    middleware: [ 'robot' ],
    robot: { ua: [Array] },
    coreMiddlewares: [
      'meta',
      'siteFile',
      'notfound',
      'static',
      'bodyParser',
      'overrideMethod',
      'session',
      'securities',
      'i18n',
      'eggLoaderTrace'
    ],
    appMiddlewares: [ 'robot' ],
    appMiddleware: [ 'robot' ],
    multipartParseOptions: {
      autoFields: false,
      defCharset: 'utf8',
      limits: [Object],
      checkFile: [Function: checkFile]
    }
  },
  service: ClassLoader {
    _cache: Map(0) {},
    _ctx: {
      request: [Object],
      response: [Object],
      app: [Object],
      originalUrl: '/',
      req: '<original node req>',
      res: '<original node res>',
      socket: '<original node socket>'
    }
  }
}
```