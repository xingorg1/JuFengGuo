/*
 * @Author: @Guojufeng 
 * @Date: 2019-01-18 07:17:58 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-01-20 22:12:59
 */
console.log('学生管理系统')
var myObj = {
  init: function () {
    this.path = 'http://api.duyiedu.com';
    this.tabChange();
    this.getData();
    this.bindEvent();
  },
  /* tab选项卡新写法 */
  tabChange: function () {
    var nav = document.getElementById('nav'),
      dd = nav.getElementsByTagName('dd'),
      container = document.getElementById('container'),
      displayCont = container.getElementsByClassName('cont-items'),
      curIndex = 0;
    Array.prototype.forEach.call(dd, function (el, i) {
      dd[i].onclick = function (e) {
        console.log(e.target, e.target.classList.add())
        //当前点击的是已经选中的，不做任何处理。
        if (i == curIndex) {
          return false;
        }
        //当前点击的nav-list添加选中cur类名
        this.className = 'cur';
        // 当前点击的nav-list对应的cont内容展示出来
        displayCont[i].className = 'cont-items';
        //上一次添加了cur类名的nav-list清除类名
        dd[curIndex].className = '';
        // 上一次展示的内容隐藏
        displayCont[curIndex].className = 'cont-items hide';
        //本次点击的索引成了上一次，进行备份
        curIndex = i;
      }
    });
  },
  /* 交互事件绑定 */
  bindEvent: function () {
    /* 出现弹窗 */
    editLayer.onclick = function (e) {
      var e = e || window.event;
      e.stopPropagation();
      if (e.target.className.indexOf('layer') !== -1) {
        this.className = 'layer hide';
      }
    }
    var closeLayer = document.getElementById('close');
    var resetLayer = document.getElementById('resetLayer');
    resetLayer.onclick = closeLayer.onclick = function (e) {
      editLayer.className = 'layer hide';
    }
  },
  /* 获取数据Ajax */
  getData: function () {
    var self = this;
    Ajax.request({
      url: this.path + "/api/student/findAll",
      data: {
        appkey: 'xingorg1_1547735306291',
      },
      success: function (xhr) {
        console.log(xhr.response);
        self.initAddData();
      },
      error: function (xhr) {
        /* 待做 - 弹窗提示数据获取失败，让刷新 */
        alert('数据获取失败，请刷新页面尝试！');
      }
    });
  },
  /* 初始化 - 数据获取后渲染 */
  initAddData: function (data) {
    var tbody = document.getElementById('tbody');
    var rstStr = '<tr>';
    // <td>xing.org1^</td>
    //   <td>115</td>
    //   <td>女</td>
    //   <td>702004176@qq.com</td>
    //   <td>18</td>
    //   <td>14121425235</td>
    //   <td>中国 北京</td>
    //   <td>
    //     <span class="edit">编辑</span>
    //     <span class="del">删除</span>
    //   </td>
    tbody.innerHTML = rstStr;
  }
}
myObj.init();


/* 新增学生 */
function submitForm() {
  console.log(window.location.search);
  if (false) {
    return false;
  }
}
submit.onclick = function (e) {
  // e.preventDefault();
  Ajax.request({
    url: path + "/api/student/addStudent",
    data: {
      appkey: 'xingorg1_1547735306291',
      sNo: 2018116,
      name: '小石头',
      sex: 0,
      birth: 1998,
      phone: 15120293402,
      address: '北京',
      email: '39280242@qq.com'
    },
    success: function (xhr) {
      console.log(xhr)
    },
    error: function (xhr) {

    }
  });
}
/* 编辑学生 */
function submitForm2() {
  alert(window.location.search);
}


















/* 另一个ajax使用 */
/* ajax({
  url: path + "/api/student/findAll",
  data: {
    appkey: 'xingorg1_1547735306291',
  },
  method: 'get',
  success: function (xhr) {
    console.log(xhr)
  },
  error: function (xhr) {
  }
}); */



function  outer(){
  function inner(){
    console.log('in');
  }
  inner();
  console.log('out');
}
outer();
