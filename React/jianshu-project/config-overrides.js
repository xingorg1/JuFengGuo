const path = require('path')
function resolve(dir){
  return path.join(__dirname, dir)
}
module.exports = function override(config, env){
  // console.log(config, env)
  // 别名配置
  config.resolve.alias = {
    '@': resolve('src'),
    '@comp': resolve('src/components'),
    '@view': resolve('src/views'),
    '@css': resolve('src/assets/styles'),
    '@img': resolve('src/assets/images'),
    '@util': resolve('src/utils'),
  }
  return config;
}