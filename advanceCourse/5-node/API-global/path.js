const path = require('path'),
    {
        log
    } = console
// log(path)
log(path.basename('src/a/b.js')) // b.js
log(path.basename('src/a/b.js', '.html')) // b.js
log(path.dirname('src/a/b.js')) // src/a
log(path.sep) // "/" 路径分隔符
log('src/a/b.js'.split(path.sep)) // "/" 路径分隔符
// window:
//     'foo\\bar\\baz'.split(path.sep);
// // Returns: ['foo', 'bar', 'baz']
log(__filename)
log(path.delimiter) // :
log(process.env.PATH) // /usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
log(process.env.PATH.split(path.delimiter)) // [ '/usr/local/bin', '/usr/bin', '/bin', '/usr/sbin', '/sbin' ]
log(path.dirname('src/a/b.js')) // src/a
log(path.dirname('src/a/b')) // src/a 这里b被当做是无后缀的文件，不当做目录
log(path.extname('index.html'));
// // Returns: '.html'

// log(path.extname('index.coffee.md'));
// // Returns: '.md'

// log(path.extname('index.'));
// // Returns: '.'

// log(path.extname('index'));
// // Returns: ''

// log(path.extname('.index'));
// // Returns: ''

// log(path.extname('.index.md'));
// // Returns: '.md'


log(path.join('a', 'b', 'c', 'd.js')) // a/b/c/d.js
log(path.join('a', 'b', '../', 'c.js')) // a/c.js

log(path.parse('src/a/b.js')) // { root: '', dir: 'src/a', base: 'b.js', ext: '.js', name: 'b' }
log(path.format(path.parse('src/a/b.js'))) // src/a/b.js

log(path.relative('./module.js', './node_modules/abc/index.js')) // ../node_modules/abc/index.js 相对于当前目录API-global的

log(path.resolve(__dirname, 'node_modules/abc/index.js')) // /Users/guojufeng/..../API-global/node_modules/abc/index.js
log(path.resolve('./a.js'))
log(process.cwd() === __dirname) // true