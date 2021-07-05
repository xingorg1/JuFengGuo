/*
 * @Author: @Guojufeng 
 * @Date: 2018-12-13 14:55:22 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-02-01 13:59:06
 */

var debug = true;
var pauseDom = document.getElementById('pause'), //暂停|开始按钮
  foodDom = document.getElementById('food'), // 食物
  foodBodyDom = document.getElementById('foodBody'), //为了给食物改颜色获取的。
  snakeDom = document.getElementById('snake'); //蛇
function SnakeGame() {
  var contDom = document.getElementById('cont');
  this.canOw = contDom.clientWidth; // 视口宽度
  this.canOh = contDom.clientHeight; // 视口高度
  this.timer = null;
  this.foodSize = 20; //食物尺寸 - 宽、高
  // this.foodOh = 20; //食物尺寸 - 高
  this.foodL = parseInt(Math.random() * (this.canOw - this.foodSize)); //随机的食物left位置点
  this.foodT = parseInt(Math.random() * (this.canOh - this.foodSize)); //随机的食物top位置点
  /* 蛇 */
  this.snakeSize = 20; //蛇身
  this.range = 200; //蛇位置初始时，与墙壁的安全距离
  var snakeL = Math.floor(Math.random() * this.canOw + this.range); //[300 - clientW-300]
  var snakeT = Math.floor(Math.random() * this.canOh + this.range); //[300 - clientH-300]
  var leftRange = this.canOw - this.range,
    topRange = this.canOh - this.range;
  /* 蛇身随机出现的位置 */
  this.snakeL = snakeL > leftRange ? leftRange : snakeL;
  this.snakeT = snakeT > topRange ? topRange : snakeT;
  this.snakeBody = [
    [4, 1, 'head'],
    [3, 1, 'body'],
    [2, 1, 'body'],
    [1, 1, 'body']
  ]; //蛇的数据模型：[x,y,身体某一节]
  /* 游戏属性 */
  this.dir = 'right'; //蛇头朝向
  this.OTop = true;
  this.ORight = false;
  this.OBottom = true;
  this.OLeft = false;
  if (this.snakeL > Math.ceil(this.canOw / 2)) {
    this.dir = 'left';
  }
}
SnakeGame.prototype.init = function () {
  /* 初始化效果 */
  var start = document.getElementById('start');
  xingorg1Utils.addHander(start, 'click', (e) => {
    // 点击开始游戏 - 绑定事件
    start.className = 'start hide'; //隐藏开始按钮
    if (debug) {
      this.startGame();
      this.showFood();
    } else {
      this.countDown()
        .then(() => {
          // 倒计时结束后真正开始
          console.log(this);
          this.startGame();
          this.showFood();
        });
    }
  });
};
SnakeGame.prototype.countDown = function () {
  /* 预备 - 倒计时功能 */
  var countDown = document.getElementById('countDownBox');
  countDown.style.display = 'block';
  countDown.innerText = '预备';
  return new Promise((resolve) => {
    var count = 3;
    var timer = setInterval(() => {
      if (count < 1) {
        clearInterval(timer);
        timer = null;
        countDown.style.display = 'none';
        countDown.className = 'count-down';
        resolve();
      } else {
        countDown.className = 'count-down ani';
        countDown.innerText = count;
        countDown.style.color = xingorg1Utils.getRandomColor(); //文字随机换色
        count--;
      }
    }, 1000);
  });
};
SnakeGame.prototype.startGame = function () {
  /* 开始游戏 */
  console.log('游戏开始');
  pauseDom.className = 'pause-btn on'; //左上角按钮修改
  // 初始化蛇
  this.snakeInit();
  xingorg1Utils.addHander(pauseDom, 'click', (e) => {
    // 点击左上角暂停|开始游戏 - 绑定事件
    if (pauseDom.className.indexOf('off') !== -1) {
      pauseDom.style.display = 'none';
      if (debug) {
        pauseDom.style.display = 'block';
        pauseDom.className = 'pause-btn on'; //暂停状态下-继续开始
        // 代做 - start蛇的运动
      } else {
        this.countDown()
          .then(() => {
            pauseDom.style.display = 'block';
            pauseDom.className = 'pause-btn on'; //暂停状态下-继续开始
            // 代做 - start蛇的运动
          });
        console.log('游戏重启');
      }
    } else {
      pauseDom.className = 'pause-btn off'; //开始状态下-点击暂停
      console.log('游戏暂停');
      // 代做 - 停止蛇的运动
    }
  })
};
SnakeGame.prototype.snakeInit = function () {
  /* 蛇的初始化 */
  snakeDom.className = 'snake-box'; //展示蛇
  this.snakeCreat(this.snakeL, this.snakeT); //创建蛇
  var speed = 50;
  this.timer = setInterval(() => {
    // this.snakeCreat(Math.floor(this.snakeL += this.snakeSize / 5), this.snakeT);
    this.snakeMove()
  }, speed);
  this.controlSnake();
};
SnakeGame.prototype.snakeCreat = function (oL, oT) {
  /* 生成蛇 */
  // 蛇的位置，下一节应该是上一节的位置+/- 自身的宽度
  /*  var str = ''
   for (let i = 0; i < this.snakeBody.length; i++) {
     if(this.snakeBody[i][2] == 'head'){
       str += `<div class="head ${this.dir}" 
       style="left: ${ this.snakeBody[i][0] * 20 }px;top: ${ this.snakeBody[i][1] * 20 }px">
       <span class="eyes">
         <span class="eye eye-left"></span>
         <span class="eye eye-right"></span>
       </span>
     </div>`;
     }else{
       str += `<div class="body" 
       style="left: ${ this.snakeBody[i][0] * 20 }px;top: ${ this.snakeBody[i][1] * 20 }px">
       </div>`
     }
   } */
  var str = this.snakeBody.reduce((pre, cur, i) => {
    if (cur[2] === 'head') {
      pre += `<div class="head ${ this.dir }" 
      style="left: ${ this.snakeBody[i][0] * 20 }px;top: ${ this.snakeBody[i][1] * 20 }px">
      <span class="eyes">
        <span class="eye eye-left"></span>
        <span class="eye eye-right"></span>
      </span>
    </div>`;
    } else {
      /* var dis = (this.snakeBody[1][0] - cur[0]) * this.snakeSize;
      var bodyL = oL - dis;
      if (this.dir == 'left') {
        // 初始方向向左还是向右
        bodyL = oL + dis;
      }
      console.log(bodyL) */
      pre += `<div class="body" 
      style="left: ${ this.snakeBody[i][0] * 20 }px;top: ${ this.snakeBody[i][1] * 20 }px">
      </div>`
    }
    return pre;
  }, '');
  console.log(str);
  snakeDom.innerHTML = str;
};
SnakeGame.prototype.controlSnake = function () {
  // 绑定键盘事件
  document.onkeydown = (e) => {
    // 控制蛇头的方向
    switch (e.keyCode) {
      case 37:
        if (this.dir !== 'right') { //当蛇在向右走，左边不能按
          this.dir = 'left';
        }
        break;
      case 38:
        if (this.dir !== 'bottom') {
          this.dir = 'top';
        }
        break;
      case 39:
        if (this.dir !== 'left') {
          this.dir = 'right';
        }
        break;
      case 40:
        if (this.dir !== 'top') {
          this.dir = 'bottom';
        }
        break;
      default:
        break;
    }
    this.snakeRest();//清除
    this.snakeCreat();//重绘
  }
}
SnakeGame.prototype.snakeMove = function () {
  /* 蛇移动 */
  // 改变映射数据
  var moveDis = this.snakeSize / 5; //每次的移动距离
  
  for (let i = this.snakeBody.length - 1; i > 0; i--) {
    var ele = this.snakeBody[i];
    ele[0] = this.snakeBody[i - 1][0];
    ele[1] = this.snakeBody[i - 1][1];
  }
  switch (this.dir) { //根据放向，移动蛇头
    case 'top':
      this.snakeBody[0][1] -= moveDis;
      break;
    case 'right':
      this.snakeBody[0][0] += moveDis;
      break;
    case 'bottom':
      this.snakeBody[0][1] += moveDis;
      break;
    case 'left':
      this.snakeBody[0][0] -= moveDis;
      break;
    default:
      break;
  }
  if (debug) {
    this.snakeCreat(Math.floor(this.snakeL += this.snakeSize / 5), this.snakeT);
    return false;
  }
  
};
SnakeGame.prototype.snakeRest = function () {
  /* 蛇停止 */
  clearInterval(this.timer);
  this.timer = null;
};
SnakeGame.prototype.snakeClear = function () {
  snakeDom.innerHTML = '';
};
SnakeGame.prototype.showFood = function () {
  /* 出现食物、并随机更改食物的颜色值和位置 */
  foodDom.style.left = this.foodL + 'px';
  foodDom.style.top = this.foodT + 'px';
  foodBodyDom.style.background = xingorg1Utils.getRandomColor();
  foodDom.className = 'food show';
};
SnakeGame.prototype.hideFood = function () {
  /* 吃掉食物 */
  foodDom.className = 'food hide';
};
window.onload = function () {
  /* 阻止浏览器双击默认事件-----双击选中 */
  document.ondragstart = document.onselectstart = function () {
    return false;
  };
  /* 初始化程序 */

  var myGame = new SnakeGame();
  myGame.init();
}


/* */
// setInterval(()=>{
//   // xingorg1Utils.getRandomColor()
//   console.log(Math.floor(Math.random() * 6) + 3)
// },100) 



/* 实例结构 
var snakeGame = {
  canOw: cont.clientWidth,
  canOh: cont.clientHeight,
  foodOw: 20,
  foodOh: 20,
  snake: [[3,1,'head'],[2,1,'body'],[1,1,'body']],
  init: function(){
    console.log(this.canOw,this.canOh);
    this.startGame();
  },
  startGame: function(){
  }
} */