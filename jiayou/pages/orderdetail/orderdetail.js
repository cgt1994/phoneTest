// pages/orderdetail/orderdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      item:[
        {
         "orderNo":"abcdefghijklmn",
         "money":500,
         "state":"已充值"
        }, {
          "orderNo": "1232131221xc456",
          "money": 500,
          "state": "已充值"
        },
        {
          "orderNo": "123456",
          "money": 500,
          "state": "付款待充值"
        },
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var app=getApp()
    app.globalData.zqToken="nima"
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})