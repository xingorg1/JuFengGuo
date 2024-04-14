const path = require('path')
const chalk = require('chalk')
const Creator = require('./Creator.js')
// lib/create.js 简单实现打印路径和项目名
module.exports = async (projectName) => {
  // 得到命令运行时的目录
  const cwd = process.cwd()
  // 目录拼接项目名
  const targetDir = path.resolve(cwd, projectName || '.')
  console.log(`${chalk.green('创建项目的目录路径:')} ${chalk.blueBright(targetDir)}`);
  /* console.log(
    path.resolve('ejs.js' || '.'),
    11111111,
    path.join(process.cwd(), 'ejs.js' || '.')
  ) */
  // 实例化 Creator类
  const creator = new Creator(projectName, targetDir)
  // 调用
  await creator.create()
}