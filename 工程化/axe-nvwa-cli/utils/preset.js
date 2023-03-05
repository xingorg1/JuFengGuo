// inquirer 交互式问题 预设 babel 和 eslint
const defaultPreset = {
  useConfigFiles: false,
  cssPreprocessor: undefined,
  plugins: {
    '@vue/cli-plugin-babel': {},
    '@vue/cli-plugin-eslint': {
      config: 'base',
      lintOn: ['save']
    }
  }
}
// vue2、vue3选项预设了 babel 和 eslint
const vuePresets = {
  'Default (Vue 3)': Object.assign({ vueVersion: '3' }, defaultPreset),
  'Default (Vue 2)': Object.assign({ vueVersion: '2' }, defaultPreset)
}

const defaults = {
  lastChecked: undefined,
  latestVersion: undefined,

  packageManager: undefined,
  useTaobaoRegistry: undefined,
  presets: vuePresets
}

module.exports = {
  defaultPreset,
  vuePresets,
  defaults
}