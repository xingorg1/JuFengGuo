const { mkdir, mkdirSync, promises } = require("fs");

// mkdir 异步的创建目录 http://nodejs.cn/api/fs.html#fs_fs_mkdir_path_options_callback
// mkdirSync 同步的创建目录
// promises.mkdir 异步的创建目录 http://nodejs.cn/api/fs.html#fs_fspromises_mkdir_path_options
// let fs = require("fs");
let path = require("path");

const { log } = console;
const pathName = path.resolve(__dirname, './pathName')
const result = mkdirSync(pathName, {
  // 当 path 是已存在的目录时，调用 fs.mkdir() 仅在 recursive 为 false 时才会导致错误。
  recursive: true // 设置这个，即使要创建的目录已经存在，也不会报错。
}, (err,data) => {
  log(12, err)
  if (err) throw err;
  log(13, data)
})
log(result)

/* 官网例子
// 创建 `/目录1/目录2/目录3`，不管 `/目录1` 和 `/目录1/目录2` 是否存在。
fs.mkdir("/目录1/目录2/目录3", { recursive: true }, (err) => {
  if (err) throw err; // Error: ENOENT: no such file or directory, mkdir '/目录1'] 
});
 */