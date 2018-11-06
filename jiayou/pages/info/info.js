// pages/info/info.js
// 。:
// 0 待提交
// 1 审核中
// 2 审核通过
// 3 审核拒绝

var app = getApp()
var util = require("../../utils/network.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: null,
    identify: "",
    phone: "",
    record: "",
    state:-1,
    statement:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.showLoading({
      title: '请稍等',
    })
    var that=this;
    util.requestBase('/driver/driverInfo/get',null,function(res){
      wx.hideLoading()
      console.log(res.data.result.idCardApproveStatus+" 状态")
      var state = res.data.result.idCardApproveStatus
      var statement=""
    switch(state){
      case 0:
        statement ="待提交"
        break
      case 1:
        statement = "审核中"
        break
      case 2:
        statement = "审核通过"
        break
      case 3:
        statement = "审核拒绝"
        break
      
    }
      that.setData({
        state: res.data.result.idCardApproveStatus,
        statement: statement
      })
    },function(res){
      wx.hideLoading()
    })
    var data = getApp().globalData.userInfo
    console.log("data==" + data)
    if (data==null||!data.hasOwnProperty("identity")) {
     wx.showToast({
       title: '数据异常',
     })
     return
    }
    var myidentity = ""
    var myphone = ""
    var myrecord = ""
    if (data.identity=="new") {
      console.log("新用户")
      this.setData({
        info: null
      })

    } else {
      if (data.identity == "driver") {
        myidentity = "司机"
        myphone = data.driverInfoView.telephone
        myrecord = "接单记录"
        this.setData({
          info: data,
          identify: myidentity,
          phone: myphone,
          record: myrecord
        })
      } else if (data.identity == "supplier") {
        myidentity = "商家"
        myrecord = "发单记录"
        this.setData({
          info: data,
          identify: myidentity,
          phone: myphone,
          record: myrecord
        })
      }
    }
    console.log(data.identity + "---")
    console.log(myidentity + "---")
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  toOrder: function(e) {
    wx.navigateTo({
      url: '../orderdetail/orderdetail'　 // 详情页面
    })
  }
})