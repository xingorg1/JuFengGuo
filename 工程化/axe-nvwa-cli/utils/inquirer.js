// inquirer学习
// 脚手架需要内置一些提示选项，如创建 Vue2 项目，创建 Vue3 项目，选择 Babel 特性，选择 Eslint 特性，选择 Vuex  特性等等提示选项。借助
// inquirer 来实现提示对话框，把这些提示选项显示给用户，脚手架获取用户输入去实现相关的逻辑。

const inquirer = require('inquirer')
/**
 * inquirerConfig
 * type 表示类型，枚举值有：input 表示输入框，list 表示单选项，checkbox 表示多选项，confirm 表示确认项；
 * name 表示键名，default 表默认值，message 是名称。
 */
const inquirerConfig = [{
    type: 'input',
    name: 'projectName',
    message: '项目名称',
    default: 'axe-demo',
  },
  {
    type: 'list',
    name: 'projectType',
    message: '项目类型',
    default: 'vue2',
    choices: [{
        name: 'vue2',
        value: 'vue2'
      },
      {
        name: 'vue3',
        value: 'vue3'
      },
      {
        name: 'react',
        value: 'react'
      }
    ]
  },
  {
    type: 'checkbox',
    name: 'plugins',
    message: '插件选择',
    choices: [{
        name: 'babel',
        value: 'babel'
      },
      {
        name: 'eslint',
        value: 'eslint'
      },
      {
        name: 'vue-router',
        value: 'vue-router'
      }
    ]
  },
  {
    type: 'confirm',
    name: 'confirm',
    message: 'confirm',
  }
];
/**
 * 交互式命令
 */
inquirer.prompt(inquirerConfig).then(answers => {
  console.log('==============');
  console.log(answers);
}).catch(error => {
  console.log('--------------')
  console.log(error)
})