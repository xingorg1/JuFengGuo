/*
 * @Author: @Guojufeng 
 * @Date: 2019-02-11 20:29:21 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-02-12 17:33:32
 */
(function () {
  // 立即执行函数，防止全局污染
  var temp = $('.tel'), //保存dom防止多次获取而耗费性能
    claArr = ['one', 'two', 'three'],
    curPage = 0, //当前展示页数
    showNum = 10,//预定每页展示条数
    totalPage = Math.floor(data.length / showNum);//总页数
  temp.hide();
  drawDom();
  $('.change').on('click', function () {
    // curPage = ++curPage % totalPage（老师的写法）
    if (curPage < totalPage) {
      curPage ++;
    } else {
      curPage = 0;
    }
    $('.list-cont li').not('.tel').remove();
    drawDom();
  })

  function drawDom() {
    var residue = data.length - curPage * showNum,//剩余条数
        len = residue >= showNum ? showNum : residue;//当前页可以展示条数，满足10或剩下不到10条
    for (let i = 0; i < len; i++) {
      var ele = data[i + curPage * showNum];
      var r = temp.clone().removeClass('tel').fadeIn(); //这里删除类名一定要，否则就会出现死循环，最终因为最大栈占用报错
      $(r)
        .addClass(i <= 2 && curPage == 0 ? claArr[i] : '')
        .find('.txt')
        .html('<span>' + (i + curPage * showNum + 1) + '</span>' + ele.title)
        .end()
        .find('.num')
        .html(ele.search + '<i class="sign">' + (ele.hisSearch - ele.search > 0 ? '↑' : '↓') + '</i>')
        .find('.sign')
        .addClass(ele.hisSearch - ele.search > 0 ? 'up' : 'down')
        .end()
        .end()
        .appendTo('.list-cont');
      }
    /* data.slice(curPage, len).forEach(function(ele,i){
      var r = temp.clone().removeClass('tel').fadeIn();//这里删除类名一定要，否则就会出现死循环，最终因为最大栈占用报错
      $(r)
        .addClass(i > 2 ? '' : claArr[i])
        .find('.txt')
        .text(ele.title)
        .end()
        .find('.num')
        .html(ele.search + '<i class="sign">'+ (ele.hisSearch - ele.search > 0 ? '↑' : '↓' )+ '</i>')
        .find('.sign')
        .addClass(ele.hisSearch - ele.search > 0 ? 'up' : 'down')
        .end()
        .end()
        .appendTo('.list-cont')
    }); */
  }
})();