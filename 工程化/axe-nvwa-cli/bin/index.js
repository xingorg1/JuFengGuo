#!/usr/bin/env node
/**
 * node bin/index.js --help
 * 自动化帮助信息
 */
const {
  program
} = require('commander')
const chalk = require('chalk')
const create = require('../lib/create')

/**
 * 名称，描述，版本号，用法提示
 */
program
  .name(chalk.cyan('axe-nvwa-cli'))
  .description(chalk.red.bold(`小石头的斧子宇宙之 ${chalk.bgRed(' axe-nvwa-cli ')} 脚手架`))
  .version(`axe-nvwa-cli ${require('../package.json').version}`)
  .usage(chalk.cyan('<command> [options]'));

/**
 * 自定义事件监听
 */
program.on('--help', () => {
  console.log()
  console.log(`  执行命令 ${chalk.yellow(`axe-nvwa-cli <command> --help`)} 以获取各命令更详细的使用说明。`)
  console.log()
})

/* 
 * 命令1：
 * create 创建一个页面
 */
// 以下两行代码可以简写：program.command('create <name>')，详见commander官方文档
program.command('create')
  .argument('<app-name>', '项目名称') // <name> 表 name 为必填
  .description(chalk.green('# 创建项目')) // 命令描述
  .option('-s, --separator <char>', '分隔符', ',') // options参数示例，会是action函数的第二个参数对象属性之一
  .action((name, options) => { // 输入该命令的动作，逻辑实现。
    // console.log(chalk.green(`新建了一个文件：${chalk.blue(name)}`), options);
    create(name, options)
  });

/**
 * 解析
 */
// console.log(process.argv, process.cwd());
program.parse(process.argv);