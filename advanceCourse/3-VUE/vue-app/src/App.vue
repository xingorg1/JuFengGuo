<template>
  <div id="app">
    <header>
      <div class="nav">
        <div class="logo" @click="goHome()">logo</div>
        <ul class="nav-list">
          <li>
            <router-link to="/home">首页</router-link>
          </li>
          <li>
            <router-link :to="{path: '/study'}">课程</router-link>
          </li>
          <li>
            <router-link :to="{name: 'student'}">学生</router-link>
          </li>
          <li>
            <router-link to="/about" tag="span">关于</router-link>
          </li>
          <li>
            <router-link to="/community">社区</router-link>
          </li>
        </ul>
      </div>
    </header>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goHome() {
      /* 三种方法跳转页面 */
      // push - 历史记录中留信息
      this.$router.push("/home");
      // replace - 历史记录中不留信息
      // this.$router.replace('/home');
      // go - 跳转到指定的历史记录（前进几条/后退几条）
      // 0:当前页-刷新
      // 1:前进1页
      // -1:后退1页
      // this.$router.go(1);
    }
  }
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
#app {
  min-width: 400px;
}
#app header {
  background: #aaf;
}
h1 {
  font-size: 24px;
  font-weight: 900;
  padding-bottom: 10px;
  border-bottom: 1px solid #333;
}
h3 {
  font-weight: 600;
}
.logo {
  cursor: pointer;
}
.nav {
  margin: 0 auto;
  max-width: 1200px;
}
.nav {
  line-height: 75px;
  padding: 0 45px;
  overflow: hidden;
}
.logo {
  float: left;
  font-weight: 900;
  font-size: 20px;
  color: #ff1;
}
.nav-list {
  float: right;
  color: #fff;
}
.nav-list li {
  float: left;
  margin-left: 15px;
  cursor: pointer;
}

.nav-list li a {
  color: #fff;
  text-decoration: none;
}
.nav-list li:hover,
  .nav-list li:hover a,
  /* .nav-list li .router-link-exact-active { */
  /* 为了在嵌套路由的时候，母路由也有选中样式 */
  .nav-list li .router-link-active {
  color: #ffff11;
  font-weight: 600;
}

.container {
  padding: 20px;
}

/* 表单 */
.form {
  margin-top: 10px;
}
label {
  display: block;
  margin-bottom: 10px;
  font-size: 12px;
  line-height: 40px;
  cursor: pointer;
}
input {
  padding: 5px 10px;
  border: 1px solid #eee;
  outline: none;
}
input:focus {
  border-color: #aaf;
}
button {
  border: none;
  border: 1px solid #333;
  background: none;
  padding: 7px 18px;
  border-radius: 3px;
  margin-right: 10px;
  cursor: pointer;
  color: #333;
  background: #fff;
  outline: none;
}
button.submit {
  /* background: #aaf; */
  border: 1px solid #88f;
}
button.submit:hover {
  color: #fff;
  background: #88f;
}
button.cancel {
  /* background: tomato; */
  border: 1px solid #ff4a2a;
}
button.cancel:hover {
  color: #fff;
  background: #ff4a2a;
}
</style>
