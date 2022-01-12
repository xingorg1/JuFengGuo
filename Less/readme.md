# LESS（Leaner Style Sheets）
文档：https://less.bootcss.com/

less语法过一遍

向后兼容

Less.js：将 Less 样式转换成 CSS 样式，基于js开发

## 变量（Variables）
变量用`@`关键字定义
```less
@width: 10px;
```

## 混合（Mixins）
样式复用
```less
.bordered {
  border: dotted 1px black;
}
#menu a {
  .bordered();
}
```

## 嵌套（Nesting）
同scss

`&` 表示当前选择器的父级

```less
.clearfix {
  display: block;
  zoom: 1;

  &:after {
    content: " ";
    display: block;
    font-size: 0;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}
```
`@`规则嵌套
```less
.component {
  width: 300px;
  @media (min-width: 768px) {
    width: 600px;
    @media  (min-resolution: 192dpi) {
      background-image: url(/img/retina2x.png);
    }
  }
  @media (min-width: 1280px) {
    width: 800px;
  }
}
// 编译结果
.component {
  width: 300px;
}
@media (min-width: 768px) {
  .component {
    width: 600px;
  }
}
@media (min-width: 768px) and (min-resolution: 192dpi) {
  .component {
    background-image: url(/img/retina2x.png);
  }
}
@media (min-width: 1280px) {
  .component {
    width: 800px;
  }
}
```

## 运算（Operations）
算术运算符 `+`、`-`、`*`、`/` 可以对任何数字、颜色或变量进行运算。

`+`、`-`会进行**单位转换**（不是在calc中的运算），单位换算时计算的结果以**最左侧**操作数的单位类型为准。

```less
// 所有操作数被转换成相同的单位
@conversion-1: 5cm + 10mm; // 结果是 6cm
@conversion-2: 2 - 3cm - 5mm; // 结果是 -1.5cm

// conversion is impossible
@incompatible-units: 2 + 5px - 3cm; // 结果是 4px

// example with variables
@base: 5%;
@filler: @base * 2; // 结果是 10%
@other: @base + @filler; // 结果是 15%

@base: 2cm * 3mm; // 结果是 6cm

@color: #224488 / 2; // 对颜色进行算术运算，结果是 #112244
background-color: #112244 + #111; // 结果是 #223355
```

**我理解以最左侧为准的原因**：是因为计算从左向右，第一个数值的单位被获取到后，后续的计算就以这个单位为准了。如果不是这个单位的，就自动转换为这个单位再计算。

但是自动转换也有规则限制，以下几种情况的规则**转换失效**：
- px 到 cm 
- rad 到 %

## 转义（Escaping）
`~` 字符
```less
// from
@min768: ~"(min-width: 768px)";
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}
// to
@media (min-width: 768px) {
  .element {
    font-size: 1.2rem;
  }
}
```
## 函数（Functions）
内置了多种函数：转换颜色、处理字符串、算术运算等
[less函数手册](https://less.bootcss.com/functions/)

利用 `percentage` 函数将 0.5 转换为 50%；
`saturate` 函数将颜色饱和度增加 5%，；
以及 `lighten` 函数将颜色亮度降低 25%；
`spin` 函数将色相值增加 8；
```less
@base: #f04615;
@width: 0.5;

.class {
  width: percentage(@width); // returns `50%`
  color: saturate(@base, 5%);
  background-color: spin(lighten(@base, 25%), 8);
}
```
## 命名空间和访问符
语法上跟引用混合很像。

对`混合（mixins）`进行分组，达到封装的目的。
```less
#bundle() { // 后面加个()，这块代码就不会被编译出来了。比如 #bundle .button、#bundle .tab等都不会被编译到css文件了
  .button {
    display: block;
    border: 1px solid black;
    background-color: grey;
    &:hover {
      background-color: white;
    }
  }
  .tab { 
    color: red
   }
}

body div { // 得到body div的样式就是color + button选择器下的所有
  color: rgb(0, 255, 34);
  #bundle.button();  // 第一种功能写法
  // #bundle > .button // 第二种功能写法
}
```

## 映射（Maps）

对象合集
```less
#colors() {
  primary: blue;
  secondary: green;
}
```
使用
```less
.button {
  color: #colors[primary]; // color: blue;
  border: 1px solid #colors[secondary]; // border: 1px solid green;
}
```

## 作用域（Scope）
首先在本地查找变量和混合（mixins），

如果找不到，则从“父”级作用域继承。
```less
@var: red;

#page { // 一个大括号，一个作用域
  @var: white;
  #header {
    color: @var; // white
  }
}
```
还可以变量提升
```less
@var: red;

#page {
  #header {
    color: @var; // white
  }
  @var: white;
}
```

应用：懒加载？


## 注释（Comments）
```less
/* 块注释
 * style comment! 
 */

// 行注释
```
## 导入（Importing）
```less
@import "library.less";
```
