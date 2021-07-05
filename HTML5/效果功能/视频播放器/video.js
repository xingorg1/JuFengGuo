/*
 * @Author: @Guojufeng 
 * @Date: 2019-04-09 17:24:59 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-04-10 11:09:58
 */
(function () {
  var myUtils = xingorg1Time;
  var otherU = xingorg1Other.floatObj();

  function addEvent(el, type, handler) {
    if (el.addEventListener) {
      el.addEventListener(type, handler, false);
    } else if (el.attachEvent) {
      el.attachEvent('on' + type, handler);
    } else {
      el['on' + type] = handler;
    }
  }
  /* 我的播放器 */
  var MyVideo = function () {
    /* 初始化 */
    var self = this;
    this.isScale = false;
    this.dis = 8;
    this.len = this.mulLi.length;
    this.timer1 = null;
    this.timer2 = null;
    this.volumeNum = 0.25;
    this.initVolum(this.volumeNum);
    /* 出现或隐藏控制条 */
    addEvent(this.videoBox,'mouseenter',function(){
      this.hideControl();
    }.bind(this));
    addEvent(this.videoBox,'mousemove',function(){
      clearTimeout(this.timer2);
      this.hideControl() 
    }.bind(this));
    addEvent(this.videoBox,'mouseleave',function(){
      clearTimeout(this.timer2);
      this.controlBox.style.height = '0px'; 
    }.bind(this));


    /* 双击播放 */
    addEvent(this.videoBox, 'dblclick', function () {
      this.playVideo();
    }.bind(this));
    // btn - 播放或暂停
    addEvent(this.player, 'click', function () {
      this.playVideo();
    }.bind(this));

    /* 全屏缩放 */
    addEvent(this.scale, 'click', function () {
      this.scaleScreen();
    }.bind(this));

    /* 进度条切换 */
    addEvent(this.progressBox, 'click', function (e) {
      var proRate = e.layerX,
        tolT = this.video.duration,
        width = this.progressBox.clientWidth;
      progressNum = proRate / width * tolT;
      progressLeft = proRate - this.dis;
      this.video.currentTime = progressNum;
      this.curTimeFun(progressLeft, proRate);
    }.bind(this));
    /* 进度条拖拽 */

    /* 音量加减 */
    addEvent(this.add, 'click', function () {
      this.volumFUn(true);
    }.bind(this));
    addEvent(this.decrease, 'click', function () {
      this.volumFUn(false);
    }.bind(this));
    /* 音量条切换 */
    addEvent(this.audioPro, 'click', function (e) {
      var x = e.offsetX,
        width = this.audioPro.clientWidth;
      this.volumeNum = x / width;
      this.initVolum(this.volumeNum);
    }.bind(this));
    /* 音量条拖拽 */

    /* 倍速切换 */
    for (let i = 0; i < this.len; i++) {
      addEvent(this.mulLi[i], 'click', function () {
        console.log(parseFloat(this.innerText));
        self.video.playbackRate = parseFloat(this.innerText);
      });
    }
    /* 键盘监听 */
    addEvent(document, 'keydown', function (e) {
      switch (e.keyCode) {
        // 空格键播放暂停
        case 32:
          this.playVideo();
          break;
          // 音量+
        case 38:
          this.volumFUn(true);
          break;
          // 音量-
        case 40:
          this.volumFUn(false);
          break;
          // 视频进度+
        case 39:
          this.controlVideo(true);
          break;
          // 视频进度-
        case 37:
          this.controlVideo(false);
          break;
          // esc退出全屏
        case 192:
          this.scaleScreen();
          break;
        default:
          return false;
      }
      // 左右箭头改视频播放进度
    }.bind(this));
  }
  MyVideo.prototype = {
    videoWidth: 800,
    videoBox: document.getElementById('videoBox'), //盒子
    video: document.getElementById('myVideo'), //video标签
    controlBox: document.getElementsByClassName('control-box')[0], //video标签
    player: document.getElementById('player'), //播放按钮
    progressBox: document.getElementById('progressBox'), //进度条盒子
    progress: document.getElementsByClassName('progress')[0], //进度条
    curSite: document.getElementsByClassName('cur-site')[0], //当前位置点
    // timer: document.getElementById('timer'),//
    total: document.getElementById('total'), //总时间
    curTime: document.getElementById('curTime'), //当前播放时间
    audioPro: document.getElementsByClassName('audio-progress')[0], //音频条
    audioP: document.getElementsByClassName('audio-p')[0], //音频进度条
    decrease: document.getElementsByClassName('decrease')[0], //音量减
    add: document.getElementsByClassName('add')[0], //音量加
    volTxt: document.getElementsByClassName('vol')[0], //音量加
    scale: document.getElementById('scale'), //缩放按钮
    multiple: document.getElementById('multiple'), //倍速按钮
    multipleList: document.getElementById('multiple-list'), //倍速列表
    mulLi: multiple.getElementsByTagName('li'),
    goPlay: function () {
      this.goProgress();
      this.timer1 = setInterval(function () {
        this.goProgress();
      }.bind(this), 1000);
    },
    playVideo: function () {
      // 播放视频
      if (this.video.paused) {
        this.video.play();
        this.player.innerText = '暂停';
        this.goPlay();
      } else {
        this.pauseVideo();
      }
    },
    pauseVideo: function () {
      this.video.pause();
      this.player.innerText = '播放';
      clearInterval(this.timer1);
    },
    curTimeFun: function (site, length) {
      // 时间变化处理函数 - 难点主要是秒数转换为时分秒格式
      // 封装成了秒数转换的工具方法         
      var curT = myUtils.formatTime(this.video.currentTime),
        tolT = myUtils.formatTime(this.video.duration);
      this.curTime.innerText = curT;
      this.total.innerText = tolT;
      this.curSite.style.left = site + 'px';
      this.progress.style.width = length + 'px';
    },
    goProgress: function () {
      // 进度条-自动增加变化函数
      var curT = this.video.currentTime,
        tolT = this.video.duration,
        progressNum = curT / tolT * this.progressBox.clientWidth;
      progressLeft = progressNum - this.dis;
      this.curTimeFun(progressLeft, progressNum);
      if (curT >= tolT) {
        // 播放完毕清除定时器
        this.pauseVideo();
      }
    },
    controlVideo: function (down) {
      // 键盘左右键前进或回退功能，
      var diploid = 2, //每次前进或者回退的秒数，这里是2秒（实际加上触发函数后的1秒，每次前进或后退结果是3秒）
        targ = 0,
        curT = this.video.currentTime,
        tolT = this.video.duration;
      clearInterval(this.timer1);
      if (down) {
        // 快进
        targ = otherU.add(curT, diploid); //在当前时间的基础上加上倍数
        this.video.currentTime = targ >= tolT ? tolT : targ; //临界值判断
      } else {
        // 后退
        // this.video.currentTime -= 10;
        targ = otherU.subtract(curT, diploid); //在当前时间的基础上减去倍数
        this.video.currentTime = targ <= 0 ? 0 : targ;
      }
      this.goPlay();
    },
    hideControl: function () {
      // 隐藏控制条
      this.controlBox.style.height = '75px';
      this.controlBox.style.overflow = 'visible';
      this.timer2 = setTimeout(function () {
        this.controlBox.style.height = '0px';
        this.controlBox.style.overflow = 'hidden';
      }.bind(this), 3000);
    },
    volumFUn: function (add) {
      // 音量加减
      if (add) {
        this.volumeNum = this.volumeNum >= 0.9 ? 1 : otherU.add(this.volumeNum, 0.1);
      } else {
        this.volumeNum = this.volumeNum <= 0.1 ? 0 : otherU.subtract(this.volumeNum, 0.1);
      }
      this.initVolum(this.volumeNum);
    },
    initVolum: function (num) {
      this.audioP.style.width = num * this.audioPro.clientWidth + 'px';
      this.video.volume = num;
      this.volTxt.innerText = otherU.multiply(num, 100) + '%';
    },
    scaleScreen: function () {
      if (!this.isScale) {
        this.isScale = true;
        this.videoBox.style.width = '100%';
        document.body.style.backgroundColor = '#000';
        this.scale.innerText = '还原';
      } else {
        this.isScale = false;
        this.videoBox.style.width = this.videoWidth + 'px';
        document.body.style.backgroundColor = '#f1f1f1';
        this.scale.innerText = '全屏';
      }
    }
  }
  var video = new MyVideo();
})();