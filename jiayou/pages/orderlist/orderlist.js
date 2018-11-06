// pages/orderlist/orderlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: null,
    state:"待处理"
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
    var that=this;
    var util = require("../../utils/network.js");
    //写入参数
    var params = new Object()
    params.pageSize = 1000
    params.page = 1
    util.requestBase("/driver/order/list", params, function (res) {
      console.log("任务列表长度" + (res.data.result.list.length))
      if (res.data.result.list.length > 0) {
        console.log(res.data.result.list)
        that.setData({
          items: res.data.result.list
        })
        console.log(that.data.items.length + "---")
      }else{
        wx.showToast({
          icon:null,
          title: '暂时没有数据',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  },
  toFinish:function(e){
    var item = e.currentTarget.dataset.info;
    wx.navigateTo({
      url: '../taskfinish/taskfinish?info='+ JSON.stringify(item),
    })
  }
})