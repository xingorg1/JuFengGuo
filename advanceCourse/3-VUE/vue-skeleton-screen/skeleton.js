// 被用于往index.html内插入骨架屏。
const fs = require('fs')
const { resolve } = require('path')
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

const htmlMinifier = require('html-minifier') // 压缩html

// 读取`skeleton.json`，以`index.html`为模板写入内容
const renderer = createBundleRenderer(resolve(__dirname, './dist/skeleton.json'), {
  template: fs.readFileSync(resolve(__dirname, './index.html'), 'utf-8')
})

// 把上一步模板完成的内容写入（替换）`index.html`
renderer.renderToString({}, (err, html) => {
  fs.writeFileSync('index.html', html, 'utf-8')
  html = htmlMinifier.minify(html, {
    collapseWhitespace: true,
    minifyCSS: true
  })
})