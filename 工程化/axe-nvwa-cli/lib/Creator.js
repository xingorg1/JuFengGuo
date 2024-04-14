const chalk = require('chalk')
const inquirer = require('inquirer')
const {
  defaults,
  vuePresets
} = require('../utils/preset')
const PromptModuleAPI = require('./PromptModuleAPI')
const {
  getPrompModules
} = require('./promptModules')

class Creator {
  constructor(name, context) {
    // 项目名称
    this.name = name
    // 项目路径，含名称
    this.context = process.env.AXE_CLI_CONTEXT = context
    // package.json 数据
    this.pkg = {}
    // 包管理工具
    this.pm = null
    // 预设提示选项
    this.presetPrompt = this.resolvePresetPrompts()
    // 手动自定义特性选项（复选框），比如router、babel等
    this.featurePrompt = this.resolveFeaturePrompts()
    // 保存相关提示选项
    this.outputPrompts = this.resolveOutputPrompts()
    // 注入各手动预设的详细配置，比如将router配置history模式
    this.injectedPrompts = []
    // 回调，将自定义配置可能需要的一些信息记录到其对应的插件上，比如 @vue/cli-plugin-router 记录 history 模式。
    this.promptCompleteCbs = []
    // 将一些特性加入到自定义特性待选中，并当选中这些特性时，注入更多详细配置
    const promptAPI = new PromptModuleAPI(this)
    const promM = getPrompModules()
    promM.forEach(m => m(promptAPI))

    /* // 测试交互效果（用完删除）
    inquirer.prompt(this.resolveFinalPrompts()).then((res) => {
      console.log('选择的选项：', res);
    }) */
  }
  async create() {
    // 处理用户输入
    const preset = await this.promptAndResolvePreset();
  }
  // 处理用户输入
  async promptAndResolvePreset() {
    try {
      const answers = await inquirer.prompt(this.resolveFinalPrompts())
      let preset;
      const {
        name
      } = this

      // answers 得到预设选择为 { preset: 'Default (Vue 2)' }
      if (answers.preset && answers.preset === 'Default (Vue 2)') {
        if (answers.preset in vuePresets) {
          preset = vuePresets[answers.preset]
        }
      } else {
        throw new Error('抱歉，暂不支持 Vue3、自定义特性配置情况！')
      }

      // 配置项目名称
      preset.plugins['@vue/cli-service'] = Object.assign({
        projectName: name
      }, preset)

      return preset
    } catch (error) {
      console.log(chalk.red(error));
      process.exit(1)
    }
  }
  // 最终预设数据
  resolveFinalPrompts() {
    const prompts = [
      this.presetPrompt,
      this.featurePrompt,
      ...this.outputPrompts,
      ...this.injectedPrompts
    ]
    return prompts
  }
  // 处理预设选项（单选框）
  resolvePresetPrompts() {
    const presetChoices = Object.entries(defaults.presets).map(([name, preset]) => {
      return {
        name: `${name}(${Object.keys(preset.plugins).join(',')})`, // 将预设的插件放到提示
        value: name
      }
    })
    return {
      name: 'preset', // 'preset' 用于记录是预设值
      type: 'list',
      message: '检查项目所需的功能：',
      choices: [
        ...presetChoices,
        {
          name: '手动选择配置，自定义特性设置',
          value: '__manual__'
        }
      ]
    }
  }
  // 处理自定义选项(复选框)
  resolveFeaturePrompts() {
    return {
      name: 'features', // 'features' 用于记录用户选择的选项值
      when: answers => answers.preset === '__manual__', // 上一步选择了手动配置
      type: 'checkbox',
      message: '为你的项目选择多个需要的特性',
      choices: [],
      pageSize: 10
    }
  }
  // 提示保存预设
  resolveOutputPrompts() {
    return [
      // useConfigFiles 是单选框提示选项。
      {
        name: 'useConfigFiles',
        when: answers => answers.preset === '__manual__',
        type: 'list',
        message: '请选择将 Babel/ESLint 等的配置放在 package.json 还是新建文件保存？',
        choices: [{
            name: '放到专门的文件中',
            value: 'files'
          },
          {
            name: '放到 package.json 中',
            value: 'pkg'
          }
        ]
      },
      // 确认提示选项
      {
        name: 'save',
        when: answers => answers.preset === '__manual__',
        type: 'confirm', // 是否，用confirm的类型来表示
        message: '是否将其保存为未来项目的预设？',
        default: true // 默认值
      },
      // 输入提示选项
      {
        name: 'saveName',
        when: answers => answers.save,
        type: 'input',
        message: '请输入预设名称：',
        default: 'axe-cli 预设'
      }
    ]
  }
}

module.exports = Creator