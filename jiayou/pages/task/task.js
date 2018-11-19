// pages/task/task.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 1是厂商 2是司机
    usertype: -1,
    items: [],
    page: 1,
    isLast: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log("刷新了")
    this.loadData()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var data = getApp().globalData.userInfo
    var mytype = -1;

    if (data.identity == 'driver') {
      mytype = 2
      this.loadData()
    } else if (data.identity = 'supplier') {
      mytype = 1

    }
    this.setData({
      usertype: mytype
    })

  },
  lookInMap: function(e) {
    var item = e.currentTarget.dataset.info;
    wx.navigateTo({
      url: '../map/map?info=' + JSON.stringify(item),
    })
    console.log((typeof item.startLatitude) + " " + item.startLongitude)
    console.log(item.endLatitude + " " + item.endLongitude)
  },
  loadData: function() {
    var that = this;
    var util = require("../../utils/network.js");
    //写入参数
    var params = new Object()
    params.pageSize = 1000
    params.page = 1
    wx.showLoading({
      title: '正在加载',
    })
    util.requestBase("/driver/order/acceptList", params, function(res) {
      wx.stopPullDownRefresh()
      wx.hideLoading()
      // if (res.data.result.list.length() > 0) {

      console.log(res.data.result.list)
      var list = res.data.result.list
      var last = res.data.result.list.length >= res.data.result.total
      that.setData({
        items: list,
        isLast: last

      })
      console.log(that.data.items.length + "---")

    }, function(res) {
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },
  addData: function() {
    var that = this;
    var util = require("../../utils/network.js");
    //写入参数
    var params = new Object()
    params.pageSize = 1000
    params.page = 1
    util.requestBase("/driver/order/acceptList", params, function(res) {
      wx.stopPullDownRefresh()
      // if (res.data.result.list.length() > 0) {
      if (res.data.result.list.length > 0) {
        console.log(res.data.result.list)
        var list = that.data.items.concat(res.data.result.list)
        that.setData({
          items: list
        })
        console.log(that.data.items.length + "---")
      }
    }, function(res) {
      wx.stopPullDownRefresh()
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  pickOrder: function(e) {
    var status = getApp().globalData.stauts
    if (status != 2) {
      wx.showToast({
        icon: "none",
        title: '先要通过审核才可接单!',
      })
      return
    }
    var that = this;
    var item = e.currentTarget.dataset.info;
    var util = require("../../utils/network.js");
    var params = new Object()
    var item = e.currentTarget.dataset.info;
    params.orderNum = item.orderNum
    // 接单
    params.operateCode = 1
    util.requestBase("/driver/order/operate", params, function(res) {
      wx.showToast({
        title: '接单成功!',
      })
      // 延迟调用
      setTimeout(function() {
        console.log("延迟调用============")
        that.loadData()
      }, 1000)

    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("滑到底部" + this.data.isLast)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  addTask: function(e) {
    wx.navigateTo({
      url: '../addTask/addTask'　 // 详情页面
    })
  }
})