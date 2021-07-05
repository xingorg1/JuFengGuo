// 内置模块：https://nodejs.org/dist/latest-v14.x/docs/api/os.html#os_os_eol
const os = require('os'),
    {
        log
    } = console
// log(os)

// // log(os.EOL)
// log(os.arch()) // x64
// log(process.arch) // x64
// log(os.cpus())
// log(os.cpus().length) // 12
// log(os.freemem() / 2 ** 30)
// log(os.freemem() / 1024 ** 2)
log(os.homedir())
// log(os.hostname())
log(os.tmpdir())