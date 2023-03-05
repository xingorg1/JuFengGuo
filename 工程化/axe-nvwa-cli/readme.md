# 从0-1搭建脚手架

[toc]

<!-- 名称
axe-cli
kuafu-cli
pangu-cli
nvwa-cli
fuxi-cli 
axe-pangu-cli
-->

## lib

脚手架的入口文件放到 `lib/index.js` ，核心逻辑放到 `lib/create.js` ， 简单实现打印路径和项目名

● `#!/usr/bin/env node` 表明该文件是可执行文件。
● commander 描述脚手架基本功能。
● create() 为脚手架核心逻辑。

```js
#!/usr/bin/env node
```

## 工具

脚手架开发过程中使用了一些工具，比如交互提示，获取用户输入，高亮，生成模板等等

### Commander

[Commander](https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md) 是一个命令行解决方案。负责将参数解析为选项和命令参数，通过它可以告诉用户脚手架的命令与功能，以及处理用户输入。

```bash
node bin/index.js --help
# node bin/index.js -h
```

创建文档

```bash
node bin/index.js create index.vue
```

其中，node bin/index.js是执行cli的根目录，开发时执行这个主文件，发布后就可以用 `axe-cli -h` 这种命令了

### chalk

[chalk](https://github.com/chalk/chalk) 是一个终端字符串美化工具。
需要注意的是：新版本是ESM语法，需要用 `require` 的哈，得换 `V4.x` 版本。

```js
console.log(
    chalk.red('Hello', chalk.underline.bgBlue('world') + '!')
)
```

### inquirer

[inquirer](https://github.com/SBoudrias/Inquirer.js) 是一个交互式命令行界面。提供了询问操作者的问题，获取并解析用户输入，多层级的提示，提供错误回调，检测用户回答是否合法等能力。
需要注意的是：新版本是ESM语法，需要用 `require` 的哈，得换 `V8.x` 版本。

### ejs

[ejs](https://github.com/mde/ejs) 是一个高效的嵌入式 JavaScript 模板引擎。模板可以通过数据进行动态渲染。

## bin

[bin](https://docs.npmjs.com/cli/v6/configuring-npm/package-json#bin) 是配置命令名与脚本路径。添加 bin 信息，可以让你的可执行文件安装到PATH中

> 要使用它，请在 package.json 中提供一个 bin 字段，它是命令名称到本地文件名的映射。安装时，npm 将该文件符号链接到 prefix/bin 用于全局安装，或 ./node_modules/.bin/ 用于本地安装。

```json
"bin": {
  // 命令名是axe-cli，脚本路径是bin/main.js
  "axe-cli": "bin/index.js"
}
```

If you have a single executable, and its name should be the name of the package, then you can just supply it as a string. For example:
如果你是单一执行文件，那么bin的字段名称和包的名称相同的话，就可以只配置bin为一个字符串，字符串值就是脚本路径

```json
// 这样写
{ "name": "my-program",
  "version": "1.2.5",
  "bin": "./path/to/program" 
}
// 等同于
{ "name": "my-program",
  "version": "1.2.5",
  "bin": {
    "my-program": "./path/to/program"
  } 
}
```

注意：使用bin对应的路径脚本文件，需要以 `#!/usr/bin/env node` 开头，否则脚本将在没有节点可执行文件的情况下启动！

> Please make sure that your file(s) referenced in bin starts with #!/usr/bin/env node, otherwise the scripts are started without the node executable!

### 软连接到全局环境 - 本地测试

> 思考，运行时 [npm link](https://docs.npmjs.com/cli/v8/commands/npm-link)  发生了什么？
> First, npm link in a package folder with no arguments will create a symlink in the global folder {prefix}/lib/node_modules/<package> that links to the package where the npm link command was executed. It will also link any bins in the package to {prefix}/bin/{name}. Note that npm link uses the global prefix (see npm prefix -g for its value).
> Next, in some other location, npm link package-name will create a symbolic link from globally-installed package-name to node_modules/ of the current folder.

接下来测试前面编码的功能。一般的，我们是发包到 npm 上，然后安装使用。为了方便开发测试，不采用这种方式，而是通过软链接到全局执行环境然后使用。

用 `npm link` 命令可以将该 npm 包与 命令 软链接到全局执行环境，从而在任意位置可直接使用该命令：

在 `axe-cli` 目录执行 `npm link`

然后，可以在任意位置使用命令 `axe-cli`

## Creator 核心逻辑

Creator 类是脚手架的核心，实现处理用户输入，初始化安装环境，生成项目文件，生成配置文件，生成 readme 文件，初始化 Git 等等功能。
`lib/create.js` 文件引入 `Creator` 类进行实例化，并调用。
Creator类核心逻辑：create函数

```js
async create() {
    // 处理用户输入
    const preset = await this.promptAndResolvePreset();

    // 初始化安装环境
    await this.initPackageManagerEnv(preset);

    // 生成项目文件，生成配置文件
    const generator = await this.generate(preset);

    // 生成 readme 文件
    await this.generateReadme(generator);

    this.finished();
}
```

接下来将依次详细讲解 constructor, promptAndResolvePreset, initPackageManagerEnv, generate, install, generateReadme, initGit, finished 各个方法的实现。

### 结合inquirer，实现Creator构造函数，初始化提示对话框

这里把提示选项分为 `presetPrompt` 、 `featurePrompt` 、 `outroPrompts` 、 `injectedPrompts` 四大类。
1、 `presetPrompt` 包含了 "Vue2 默认配置"，"Vue3 默认配置"，"自定义特性配置" 3 个选项，是一个单选框，用preset记录用户选择的选项值。
2、 `featurePrompt` 是当 前一个预设选项 presetPrompt 选择"手动配置特性"时展示的选项，大概有 `Babel` 、TypeScript、Vuex、PWA、 `Router` 、Vuex、CSS Pre-processors、Linter / Formatter、Unit Testing、E2E Testing 等等特性选项。需要构造一个 `PromptModuleAPI` 类来实现预设配置可插拔的机制
3、 `outroPrompts` 是当用户手动配置完选项后，提示用户将本次自定义配置保存下来以便下次使用。以及询问 Babel/ESLint 的配置放在 package.json 还是新建文件保存等等。
4、 `injectedPrompts` 是已有选项的补充，比如 vue版本选择，eslint 的详细配置，其他配置项。跟 featurePrompt 一样，各个插件的补充选项按模块划分放到 promptModules 目录，然后再通过 `PromptModuleAPI` 注入到 injectedPrompts。

### 可插拔的机制设计

`PromptModuleAPI` 类 的 `injectFeature` 方法被调用时，往 Creator 的 featurePrompt.choices 变量填充数据。

```js
const PromptModuleAPI = require('./PromptModuleAPI')
const {
    getPrompModules
} = require('./promptModules')

const promptAPI = new PromptModuleAPI(new Creator())
const promM = getPrompModules()
promM.forEach(m => m(promptAPI))
```

除了 Babel，Router，实际中还需要有 TypeScript、Vuex、PWA、Vuex、CSS Pre-processors、Linter / Formatter、Unit Testing、E2E Testing 插件，大家可以根据需要实现。
