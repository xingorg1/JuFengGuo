const chalk = require('chalk')
module.exports = pmInstance => {
  pmInstance.injectFeature({
    name: 'Router',
    value: 'router',
    description: 'Structure the app with dynamic pages',
    link: 'https://router.vuejs.org/',
  })

  // 追加配置，用于当用户手动选择「自定义预设」、并选择「router」预设后，对router预设进行更详细的配置
  pmInstance.injectPrompt({
    name: 'historyMode',
    when: answer => answer.features && answer.features.includes('router'),
    type: 'confirm',
    message: `是否使用路由的 history 模式? ${chalk.yellow(`(需要适当的服务器设置才能在生产中进行索引回退)`)}`,
    description: `通过使用 HTML5 History API，URL 不再需要“#”字符。`,
    link: 'https://router.vuejs.org/guide/essentials/history-mode.html',
    // default: true // confirm的默认值就是true，不用再写
  })

  // 将回调函数放到 promptCompleteCbs 数组中，等到执行数组里的回调时，option 记录 @vue/cli-plugin-router 插件的 historyMode 信息。
  pmInstance.onPromptComplete((answer, options) => {
    if (answer.features && answer.features.includes('router')) {
      options.plugins['@vue/cli-plugin-router'] = {
        historyMode: answer.historyMode // 这个结果是上一个confirm的选择结果Y/n，值为布尔值，表示是否开启history
      }
    }
  })
}