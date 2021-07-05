/*
 * @Author: @Guojufeng 
 * @Date: 2019-02-11 20:29:10 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-02-13 17:57:27
 */
$('.wrapper').swiper({
  imgList: ['./img/1.jpg','./img/2.jpg','./img/3.jpg','./img/2.jpg','./img/4.jpg','./img/5.jpg'],
  imgWidth: 600,
  duration: 2000,
  type: 'marquee',
  showBtn: true
});

// dropDown插件引入
$('#myJD').dropdown({
  title: '我的京东',
  width: 126,
  menuList: [{
      title: "",
      items: [{
          href: '#',
          name: '待处理订单',
      }, {
          href: '#',
          name: '消息',
      }, {
          href: '#',
          name: '返修退换货',
      }, {
          href: '#',
          name: '我的问答',
      }, {
          href: '#',
          name: '降价商品',
      }, {
          href: '#',
          name: '我的关注',
      }
      ],
  }, {
      title: '',
      items: [{
          href: '#',
          name: '我的京豆',
      }, {
          href: '#',
          name: '我的优惠券',
      }, {
          href: '#',
          name: '我的白条',
      }
      ],
  }]
});

$('#procurement').dropdown({
  title: '企业采购',
  width: 56,
  menuList: [{
      title: '',
      items: [{
          href: '',
          name: '企业购'
      }, {
          href: '',
          name: '商用场景馆'
      }, {
          href: '',
          name:'工业品'
      }, {
          href: '',
          name: '礼品卡'
      }]
  }]
});

$('#service').dropdown({
  title: '客户服务',
  // 设置下拉列表每一列元素的宽度
  width: 70,
  // 
  menuList: [{
      title: '客户',
      items: [{
          name: '帮助中心',
          href: ''
      }, {
          name: '售后服务',
          href: ''
      }, {
          name: '在线客服',
          href: '',
      }, {
          name: '意见建议',
          href: ''
      }, {
          name: '电话客服',
          href: ''
      }, {
          name: '客服邮箱',
          href: ''
      }, {
          name: '金融咨询',
          href: ''
      }, {
          name: '全球售客服'
      }]
  }, {
      title: '商户',
      items: [{
          name: '合作招商'
      }, {
          name: '学习中心'
      }, {
          name: '商家后台'
      }, {
          name: '京麦工作台'
      }, {
          name: '商家帮助'
      }, {
          name: '规则平台'
      }]
  }]
});

$('#bar-navs').dropdown({
  title: '网站导航',
  direction: 'x',
  menuList: [{
      title: '特色主题',
      width: 340,
      itemWidth: 85,
      items: [{
          name: '京东试用'
      }, {
          name: '京东金融'
      }, {
          name: '全球售'
      }, {
          name: '国际站'
      }, {
          name: '京东会员'
      }, {
          name: '京东预售'
      }, {
          name: '买什么'
      }, {
          name: '俄语站'
      }, {
          name: '装机大师'
      }, {
          name: '0元评测'
      }, {
          name: '港澳售'
      }, {
          name: '优惠券'
      }, {
          name: '秒杀闪购'
      }, {
          name: '印尼站'
      }, {
          name: '京东金融科技'
      }, {
          name: '陪伴计划'
      }, {
          name: '出海招商'
      }, {
          name: '拍拍'
      }]
  }, {
      title: '特色主题',
      width: 340,
      itemWidth: 85,
      items: [{
          name: '京东试用'
      }, {
          name: '京东金融'
      }, {
          name: '全球售'
      }, {
          name: '国际站'
      }, {
          name: '京东会员'
      }, {
          name: '京东预售'
      }, {
          name: '买什么'
      }, {
          name: '俄语站'
      }, {
          name: '装机大师'
      }, {
          name: '0元评测'
      }, {
          name: '港澳售'
      }, {
          name: '优惠券'
      }, {
          name: '秒杀闪购'
      }, {
          name: '印尼站'
      }, {
          name: '京东金融科技'
      }, {
          name: '陪伴计划'
      }, {
          name: '出海招商'
      }, {
          name: '拍拍'
      }]
  }]
});