const Controller = require('egg').Controller;

// HomeController ：控制器，继承自egg Controller的一个类
// index() ：action 实例方法
class HomeController extends Controller {
  async index() {
    // this.ctx.body = 'hello world'
    console.log(this); // , this.ctx.app
    // this.ctx.body = this.app.createAnonymousContext() // 创建一个匿名的context实例对象
    // await this.ctx.render('home/index.tpl', { ctx: 123 });
    // this.ctx.toJSON(this)
    this.ctx.body = this
  }
}

module.exports = HomeController