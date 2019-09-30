// pages/homework1/homework1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('onLoad');
    // wx.showActionSheet({
    //   itemList: ['A', false, 3, true, [1, 2]],
    //   success(res) {
    //     console.log(res.tapIndex)
    //   },
    //   fail(res) {
    //     console.log(res.errMsg)
    //   }
    // });
    wx.setStorage({
      key: 'name',
      data: '小石头',
    });
    wx.setStorage({
      key: 'hehe',
      data: '小石头181',
    });
    wx.setStorage({
      key: 'hAh',
      data: '小石头5923',
    });
    wx.getStorage({
      key: 'hah',//键名不区分大小写
      success: function(res) {
        console.log('异步获取',res);
      },
      fail: function(err) {
        console.log(err)
      },
      complete: function(e){
        console.log('------------')
      }
    });
    try{
      let rst = wx.getStorageSync('hehe');
      if(rst){
        console.log('同步获取',rst)
      }
    }catch(e){
      console.log('同步获取失败：',e)
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log('onShow')
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log('onReady')
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log('onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log('onUnload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  goBack() {
    wx.navigateBack({
      url: '../index/index'
    })
  }
})