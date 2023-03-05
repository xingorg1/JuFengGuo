// pmInstance 是 PromptModuleAPI 的实例，调用 injectFeature 方法。往 Creator 的 featurePrompt.choices 变量填充复选框选项 babel 数据。
module.exports = pmInstance => {
  pmInstance.injectFeature({
    name: 'Babel',
    value: 'babel',
    short: 'Babel',
    description: 'Transpile modern JavaScript to older versions (for compatibility)',
    link: 'https://babeljs.io/',
    checked: true // 默认选中babel
  })
}