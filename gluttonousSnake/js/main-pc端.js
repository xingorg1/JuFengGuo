/*
 * @Author: @Guojufeng 
 * @Date: 2018-12-13 14:55:22 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-02-01 18:48:45
 */

var debug = true;
var pauseDom = document.getElementById('pause'), //暂停|开始按钮
  foodDom = document.getElementById('food'), // 食物
  foodBodyDom = document.getElementById('foodBody'), //为了给食物改颜色获取的。
  snakeDom = document.getElementById('snake'), //蛇
  layerDom = document.getElementById('layer'); //计分板

function SnakeGame() {
  var contDom = document.getElementById('cont');
  this.canOw = contDom.clientWidth; // 视口宽度
  this.canOh = contDom.clientHeight; // 视口高度
  this.timer = null; //蛇运动的定时器
  this.isPaused = true; //游戏是否暂停
  this.isDead = false;
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
    [3, 1, 'head'],
    [2, 1, 'body'],
    [1, 1, 'body']
  ]; //初始化蛇的数据模型：[x,y,身体某一节],数据驱动视图
  /* 游戏属性 */
  this.totalCount = 0;
  this.dir = 'right'; //蛇头朝向
  this.dis = 1; //蛇头每次移动的距离 dis * size
  this.timer = null;
  this.speed = 150;
  /* 碰撞检测 */
  this.snakeCurL = null;
  this.snakeCurT = null;
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
  this.isPaused = false;
  pauseDom.className = 'pause-btn on'; //左上角按钮修改
  // 初始化蛇
  this.snakeInit();
  xingorg1Utils.addHander(pauseDom, 'click', (e) => {
    // 点击左上角暂停|开始游戏 - 绑定事件
    this.pauseGame();
  })
};
SnakeGame.prototype.pauseGame = function () {
  console.log(this.isPaused);
  if (this.isPaused && !this.isDead) { //如果已经暂定了游戏，就重启
    pauseDom.style.display = 'none';
    if (debug) {
      pauseDom.style.display = 'block';
      pauseDom.className = 'pause-btn on';
      this.isPaused = false;
      this.snakeMove();
    } else {
      this.countDown()
        .then(() => {
          this.isPaused = false;
          pauseDom.style.display = 'block';
          pauseDom.className = 'pause-btn on'; //暂停状态下-继续开始
          // start蛇的运动
          this.snakeMove();
        });
      console.log('游戏重启');
    }
  } else {
    console.log('游戏暂停');
    pauseDom.className = 'pause-btn off'; //开始状态下-点击暂停
    this.isPaused = true;
    // 停止蛇的运动
    this.snakeStop();
  }
};
SnakeGame.prototype.snakeInit = function () {
  /* 蛇的初始化 */
  snakeDom.className = 'snake-box'; //展示蛇
  this.snakeCreat(); //创建蛇的身体
  this.snakeControl(); //添加事件绑定-操控蛇头
  this.snakeMove(); //蛇开始移动
};

SnakeGame.prototype.snakeControl = function () {
  /* 绑定键盘事件 */
  document.onkeydown = (e) => {
    // 控制蛇头的方向
    switch (e.keyCode) {
      case 37:
        if (this.dir !== 'right' && this.dir !== 'left' && !this.isPaused) {
          //当蛇在向右走，按左边、右边都不起作用，反之触发move事件修改蛇头方向
          this.dir = 'left';
          this.snakeMove();
        }
        break;
      case 38:
        if (this.dir !== 'bottom' && this.dir !== 'top' && !this.isPaused) {
          this.dir = 'top';
          this.snakeMove();
        }
        break;
      case 39:
        if (this.dir !== 'left' && this.dir !== 'right' && !this.isPaused) {
          this.dir = 'right';
          this.snakeMove();
        }
        break;
      case 40:
        if (this.dir !== 'top' && this.dir !== 'bottom' && !this.isPaused) {
          this.dir = 'bottom';
          this.snakeMove();
        }
        break;
      case 32:
        this.pauseGame();
        break;
      default:
        break;
    }
    // console.log(this.dir);
  }
};
var num = 1;
SnakeGame.prototype.snakeMove = function () {
  /* 蛇的运动 */
  clearInterval(this.timer); //清除掉上一次的定时器
  this.timer = setInterval(() => {
    /* 开启定时器，按时修改蛇头的位置 */
    var data = this.snakeBody;
    for (var i = data.length - 1; i > 0; i--) {
      // 修改蛇身体-后一节赋值前一节的位置数据
      data[i][0] = data[i - 1][0]; //x方向
      data[i][1] = data[i - 1][1]; //y方向
    }
    switch (this.dir) { //根据当前应该移动的放向，修改蛇头的x、y值应该是+还是-
      case 'top':
        data[0][1] -= this.dis;
        break;
      case 'right':
        data[0][0] += this.dis;
        break;
      case 'bottom':
        data[0][1] += this.dis;
        break;
      case 'left':
        data[0][0] -= this.dis;
        break;
      default:
        break;
    }
    if (this.snakeCrash() == true) {
      this.gameOver();
    } else {
      this.snakeCreat(); // 数据修改后，重新格式化视图
    }
  }, this.speed);
};
SnakeGame.prototype.snakeCreat = function () {
  /* 生成蛇的身体结构 */
  var str = this.snakeBody.reduce((pre, cur, i) => {
    // 代做 - 现在默认都是向左走，怎么根据生成的随机位置改变初始的移动方向？比如生成的位置特别靠右，那么就让蛇一生下来就像左走？
    if (cur[2] === 'head') {
      // 下边+this.snakeL||T的做法，是为了让蛇在初始位置的基础上，加上随机出来的坐标值，这样每次开始游戏，蛇的位置也就随机了。
      pre += `<div class="head ${ this.dir }" 
      style="left: ${ this.snakeBody[i][0] * 20 + this.snakeL }px;
      top: ${ this.snakeBody[i][1] * 20 + this.snakeT }px">
      <span class="eyes">
        <span class="eye eye-left"></span>
        <span class="eye eye-right"></span>
      </span>
    </div>`
    } else {
      pre += `<div class="body" 
      style="left: ${ this.snakeBody[i][0] * 20 + this.snakeL }px;
      top: ${ this.snakeBody[i][1] * 20 + this.snakeT }px">
      </div>`;
    }
    return pre;
  }, '');
  // 运动和停止应该是相对的。
  snakeDom.innerHTML = str; //因为我是直接更换innerHTML，所以 我不用remove DOM，直接替换就行
  // 获取蛇头当前的位置，以备碰撞检测
  var left = parseInt(snakeDom.children[0].style.left)
  var top = parseInt(snakeDom.children[0].style.top)
  if ((left + this.snakeSize / 2 >= this.foodL && left + this.snakeSize / 2 <= this.foodL + this.foodSize) && (top + this.snakeSize / 2 >= this.foodT && top + this.snakeSize / 2 <= this.foodT + this.foodSize)) {
    /* 吃到食物，*/
    this.addCount();
  }
};
SnakeGame.prototype.addCount = function () {
  /*吃到食物 */
  /* 加分 */
  this.totalCount++;
  // 代做 - 根据吃到食物总花费的时间，分值不同。目前只做了+1;
  var scoreDom = document.getElementById('score');
  scoreDom.innerText = this.totalCount;
  /* 根据分值的增加，速度增加 */
  this.speed = 150 - this.totalCount;
  console.log('当前' + this.speed + '迈');
  /* 蛇生长 */
  this.snakeBody.push([1, 1, 'body']);
  /* 食物重生 */
  this.hideFood();
  this.foodL = parseInt(Math.random() * (this.canOw - this.foodSize)); //随机的食物left位置点
  this.foodT = parseInt(Math.random() * (this.canOh - this.foodSize)); //随机的食物top位置点
  console.log(this.foodL, '=', this.foodT);
  setTimeout(() => {
    this.showFood();
  }, this.speed);

};

SnakeGame.prototype.snakeCrash = function (l, t) {
  /* 碰撞检测 */
  var dom = snakeDom.children[0];
  var left = parseInt(dom.style.left);
  var top = parseInt(dom.style.top);
  if (left <= 0 || left >= this.canOw - 20 || top <= 0 || top + 20 >= this.canOh) {
    return true;
  }
  var snakeX = this.snakeBody[0][0]
  var snakeY = this.snakeBody[0][1]
  for (let i = 1; i < this.snakeBody.length; i++) {
    if (snakeX ==  this.snakeBody[i][0] && snakeY ==  this.snakeBody[i][1]) {
      return true;
    }
  }
};


SnakeGame.prototype.gameOver = function () {
  /* 游戏结束 */
  this.isDead = true; //死亡
  this.snakeStop(); //暂停移动
  // 蛇消失
  snakeDom.classList = 'snake-box dead';
  // 计分
  var txtDom = document.getElementById('txt');
  txtDom.innerText = this.totalCount + ' 分';
  // 展示总分面板
  setTimeout(() => {
    this.showCount();
  }, 500)
};
SnakeGame.prototype.snakeStop = function () {
  /* 暂停移动 */
  pauseDom.className = 'pause-btn off'; //开始状态下-点击暂停
  this.isPaused = true;
  clearInterval(this.timer);
  this.timer = null;
};
SnakeGame.prototype.showFood = function () {
  /* 出现食物、并随机更改食物的颜色值和位置 */
  foodDom.style.left = this.foodL + 'px';
  foodDom.style.top = this.foodT + 'px';
  foodBodyDom.style.background = xingorg1Utils.getRedRandomColor();
  foodDom.className = 'food show';
};
SnakeGame.prototype.hideFood = function () {
  /* 吃掉食物 */
  foodDom.className = 'food hide';
};
SnakeGame.prototype.showCount = function () {
  /* 结束-显示计分板 */
  layerDom.className = 'layer';
  /* 重新开始 */
  var reloadDom = document.getElementById('reload');
  reloadDom.onclick = function () {
    window.location.reload();
  }
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