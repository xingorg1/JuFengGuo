# typescript

## 启动开发

```bash
npm 1
npm run dev
```

## 初始化流程

### 1.全局编译 TS 文件

全局安装 typescript 对 TS 进行编译

```bash
npm install typescript -g
tsc --init # 生成tsconfig.json
```

编译 TS 文件

```bash
tsc # 可以将ts文件编译成js文件
tsc --watch # 监控ts文件变化生成js文件
```

### 2.配置 webpack 环境

安装依赖

```bash
npm install rollup typescript rollup-plugin-typescript2 @rollup/plugin-node-resolve rollup-plugin-serve -D
```

初始化 TS 配置文件

```bash
npx tsc --init
```

webpack 配置操作

```js
// rollup.config.js
import ts from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import serve from 'rollup-plugin-serve'
import path from 'path'
export default {
  input: 'src/index.ts',
  output: {
    format: 'iife',
    file: path.resolve('dist/bundle.js'),
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      extensions: ['.js', '.ts'],
    }),
    ts({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    }),
    serve({
      open: true,
      openPage: '/public/index.html',
      port: 3000,
      contentBase: '',
    }),
  ],
}
```

package.json 配置

```json
"scripts": {
  "dev": "rollup -c -w"
}
```

启动项目

```bash
npm run dev
```
