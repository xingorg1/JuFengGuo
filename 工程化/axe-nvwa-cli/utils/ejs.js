/**
 * ejs学习：
 * 根据用户状态渲染不同的视图：
 */
const ejs = require('ejs')

const str = `
<div>
<% if (user) { %>
  <span><%= user.name %></span>
<% } else { %>
  <span>登录</span>
<% } %>
</div>
`;

// 编译模板
let template = ejs.compile(str, {});

// 渲染模板，根据用户状态渲染不同的视图。
const data = { user: null }; // { user: { name: 'zhangsan' } }
console.log(template(data))