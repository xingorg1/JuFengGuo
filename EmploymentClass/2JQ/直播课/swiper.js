/*
 * @Author: @Guojufeng 
 * @Date: 2019-02-11 20:45:23 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-02-14 11:14:16
 * JQ版 swiper封装
 */
/* 使用示例
$('div').swiper({
  imgList: ['1','2','3'],
  showBtn: false,
  imgWidth: 300,
  type: 'fade', // 'marquee'
  pragration: true
}) */
(function () {
  // 面向对象编程(把所有变量以对象属性的方式存在，所有的函数以对象方法的形式存在)的方式 - 只要最后返回的是一个对象就行
  function Swiper(options) {
    // 构造函数最终要返回this，所以把所有方法和属性都挂载到this对象上即可
    this.father = options.hisFather; //轮播图父级
    this.imgList = options.imgList; //轮播图片列表
    this.len = this.imgList.length;
    this.showBtn = options.showBtn; //是否显示左右按钮
    this.imgWidth = options.imgWidth || $(this.father).width(); //图片的宽度，初始化或自定义
    this.imgHeight = options.imgHeight || '100%'; //图片的宽度，初始化或自定义
    this.nowIndex = 0; //当前展示页面的索引值
    this.type = options.type || 'fade'; //轮播切换方式，默认‘fade’

    this.flag = false; //当前图片是否完全展示出来（锁）
    this.dur = options.duration || 3000; //自动轮播间隔时间

    // 预定义一些样式
    this.curCss = {
      borderColor: 'rgba(255,255,255,1)',
      backgroundColor: 'rgba(255,255,255,1)'
    };
    this.borderC = 'rgba(255,255,255,0.5)';
    this.bgC = 'rgba(255,255,255,0.75)';

    // 调用方法
    this.createDom();
    this.initStyle();
    this.bindEvent();
    this.slideAuto();
  }
  Swiper.prototype.createDom = function () {
    /* 创建轮播图结构 */
    // 轮播图区域
    var oCont = $('<div class="swiper"></div>'),
      oImgList = $('<ul class="swiper-list"></ul>'),
      //  len = this.imgList.length,
      oDotBtn = $('<div class="dot"></div>')
    for (let i = 0; i < this.len; i++) {
      $('<li><img src="' + this.imgList[i] + '"/></li>').appendTo(oImgList)
      var span = null;
      if (i == this.nowIndex) {
        span = $('<span class="cur"></span>');
      } else {
        span = $('<span></span>');
      }
      span.appendTo(oDotBtn);
    }
    if (this.type === 'marquee') {
      // 无缝轮播效果
      $('<li><img src="' + this.imgList[0] + '"/></li>').appendTo(oImgList);
    }
    // 整体结构插入swiper中
    oCont.append(oImgList)
      .append('<div class="btn left-btn"> &lt; </div><div class="btn right-btn"> &gt; </div>')
      .append(oDotBtn)
      .appendTo(this.father);

  }
  Swiper.prototype.initStyle = function () {
    /* 默认样式 */
    var myWidth = 680,
      self = this;
    $(this.father).css({
      width: this.imgWidth || myWidth,
      overflow: 'hidden'
    });
    $('.swiper').css({
        position: 'relative',
        height: 281
      })
      .find('div')
      .css({
        position: 'absolute'
      })
      .end()
      .find('.btn')
      .css({
        top: 0,
        bottom: 0,
        width: 45,
        height: 75,
        margin: 'auto',
        lineHeight: '75px',
        backgroundColor: this.bgC,
        fontSize: 24,
        color: '#9c9c9c',
        fontWeight: 'bold',
        textAlign: 'center',
        cursor: 'pointer',
      })
      .hover(function () {
        $(this).css(self.curCss);
      }, function () {
        $(this).css({
          borderColor: self.borderC,
          backgroundColor: self.bgC
        });
      });

    $('.swiper-list').css({
        width: this.imgWidth * $('.swiper-list li').length,
        overflow: 'hidden'
      })
      .find('li')
      .css({
        float: 'left',
        width: this.imgWidth || myWidth,
        fontSize: 0,
      })
      .find('img')
      .css({
        width: '100%'
      });

    $('.left-btn').css({
      left: 0,
    });
    $('.right-btn').css({
      right: 0,
    });

    $('.dot').css({
      left: 0,
      right: 0,
      bottom: 0,
      textAlign: 'center'
    });

    $('.dot span').css({
      display: 'inline-block',
      width: 8,
      height: 8,
      padding: 0,
      fontSize: 0,
      margin: '0 5px',
      borderRadius: '50%',
      cursor: 'pointer',
      border: '6px solid ' + this.borderC,
      backgroundColor: this.bgC,
      backgroundClip: 'padding-box',
    });
    $('.dot span.cur').css(this.curCss);
    $('.dot span').hover(function () {
      $(this).css(self.curCss);
    }, function () {
      $(this).css({
        borderColor: self.borderC,
        backgroundColor: self.bgC
      });
    });
  }

  Swiper.prototype.bindEvent = function () {
    var self = this;
    /* 绑定事件 */
    $('.left-btn').on('click touchstart', function () {
      // 点击左侧按钮
      self.move('prev');
    })
    $('.right-btn').on('click touchstart', function () {
      // 点击右侧按钮
      self.move('next');
    })
    $('.dot').on('click touchstart', 'span', function () {
      // 点击小圆点
      /* 如果是箭头函数，this: swiper实例，$(this): jq版的swiper实例 */
      var index = $(this).index() //获取当前点击span的索引值
      self.move(index);
    })
  }
  Swiper.prototype.slideAuto = function (dir) {
    /* 自动轮播 */
    var self = this;
    clearTimeout(this.timer);
    self.timer = setTimeout(function () {
      self.move('next');
    }, this.dur);
  }
  Swiper.prototype.move = function (dir) {
    /* 运动函数 - 切换图片 */
    if (this.flag) {
      // 判断当前展示图片是否运动完毕，否的话就不进行移动，直接退出
      return false;
    }
    // 当前图片展示完毕，可以进行换图操作了，加锁
    this.flag = true;
    // 判断切换方向，* 这里switch的处理比我当初js版的轮播好多了
    switch (dir) {
      case 'prev': //用中文标记的方法可以借鉴
        //上一张
        if (this.type === 'marquee') {
          if (this.nowIndex == 0) {
            this.nowIndex = this.len;
          } else {
            this.nowIndex--;
          }
        } else {
          if (this.nowIndex == 0) {
            this.nowIndex = this.len - 1;
          } else {
            this.nowIndex--;
          }
        }
        break;
      case 'next':
        //下一张
        if (this.type === 'marquee') {
          if (this.nowIndex == this.len) {
            this.nowIndex = 1;
          } else {
            this.nowIndex++;
          }
        } else {
          if (this.nowIndex == this.len - 1) {
            this.nowIndex = 0;
          } else {
            this.nowIndex++;
          }
        }
        break;
      default:
        //任意一张
        this.nowIndex = dir;
        break;
    }
    this.switchType(this.type,dir);
  };

  Swiper.prototype.switchType = function (type,dir) {
    var self = this;
    /* 轮播图 切换 效果 */
    if (type === 'fade') {
      // 淡入淡出效果
      $('.swiper-list li')
        .fadeOut()
        .eq(this.nowIndex)
        .fadeIn(function () {
          self.changeEffect();
        });
    } else if (type === 'marquee') {
      $('.swiper-list').css({
        position: 'absolute',
        top: 0
      });
      if (self.nowIndex == this.len && dir == 'prev') {
        $('.swiper-list').css({
          left: -(self.len) * this.imgWidth
        });
        self.nowIndex = this.len - 1;
      }
      $('.swiper-list').animate({
        left: -this.imgWidth * this.nowIndex
      }, 1000, function () {
        if (self.nowIndex == self.len) {
          $('.swiper-list').css({
            left: 0
          });
          self.nowIndex = 0;
        } 
        self.changeEffect()
      })
    }
  }
  Swiper.prototype.changeEffect = function () {
    // 改变小点的样式
    $('.dot span').eq(this.nowIndex).addClass('cur').css(this.curCss).siblings('span').removeClass('cur').css({
      borderColor: this.borderC,
      backgroundColor: this.bgC
    });
    // 当图片完全展示出来后，自动轮播，并加锁
    this.slideAuto();
    this.flag = false;
  }



  // 将swiper方法扩展到jq上，就好像在jq的prototype上添加一个方法一样。只能通过这种方式来做。
  $.fn.extend({
    swiper: function (options) {
      options.hisFather = $(this) || $('body'); //保存轮播图的父级 兼容父级不是一个元素调用的情况
      new Swiper(options); //调用，执行构造函数。
      // return this;//为了jq的链式调用，返回jq对象
    }
  })
})();