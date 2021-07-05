<template>
  <div class="login">
    <h2>请登录</h2>
    <div class="form">
      <label for="username">
        账号：
        <input type="text" placeholder="请输入账号" id="username" v-model="username">
      </label>
      <label for="password">
        密码：
        <input type="password" placeholder="请输入密码" id="password" v-model="password">
      </label>
      <button class="submit" @click="login">登录</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      if (!this.username || !this.password) {
        alert("账户名或密码错误！");
      } else {
        console.log("cookie写入");
        let expires = 900 * 24 * 60 * 60 * 1000; //900填换算成毫秒数
        let date = new Date(+new Date() + expires).toUTCString(); //当前时间的毫秒数 + 900天后的毫秒数得到的全新毫秒数，作为cookie到期时间。
        document.cookie = encodeURI(`username=${this.username}`) + `;expires=${date}`;
        document.cookie = encodeURI(`password=${this.password}`) + `;expires=${date}`;
        document.cookie = encodeURI(`login=${true}`) + `;expires=${date}`;
      }
    }
  }
};
</script>

