// pages/addTask/addTask.js

var startLongitude;
var startLatitude;

var endLongitude;
var endLatitude;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startName: "",
    endName: "",
    startaddress: "",
    endaddress: "",
    goodsType: 0,
    weight: 0,
    distance: 0,
    unitPrice: 0,
    deliverDate: "",
    arriveDate: "",
    dec: ""


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
  toLocationClick: function(e) {
    var that = this;
    wx.chooseLocation({
      success: function(e) {
        that.setData({
          endName: e.name,
          endaddress: e.address
        })
        that.endLatitude = e.latitude;
        that.endLongitude = e.longitude;
        console.log(e.name + " " + e.address + " " + e.longitude + " " + e.latitude)
      },
    })
  },
  fromLocationClick: function(e) {
    var that = this;
    wx.chooseLocation({
      success: function(e) {
        that.setData({
          startName: e.name,
          startaddress: e.address
        })
        that.startLatitude = e.latitude;
        that.startLongtitude = e.longitude;
        console.log(e.name + " " + e.address + " " + e.longitude + " " + e.latitude)
      },
    })
  },
  bindDeliveryDateChange: function(e) {
    this.setData({
      deliverDate: e.detail.value
    })
  },
  bindArriveDateChange: function(e) {
    this.setData({
      arriveDate: e.detail.value
    })
  },
  inputFromPlace: function(e) {

    this.data.startaddress = e.detail
  },
  inputtoPlace: function(e) {
    this.data.endaddress = e.detail
  },
  inputWeight: function(e) {
    this.data.weight = e.detail
  },
  inputGoodDec: function(e) {
    this.data.dec = e.detail
  },
  inputdistance: function(e) {
    this.data.distance = e.detail
  },
  inputUnitPrice: function(e) {
    this.data.unitPrice = e.detail
  },
  addTask: function(e) {
    var util = require("../../utils/network.js");
    //写入参数
    var params = new Object()
    params.startName = this.data.startName
    params.startAddress = this.data.startaddress
    params.startLongitude = this.startLongtitude.toString();
    params.startLatitude = this.startLatitude.toString();
    params.endName = this.data.endName
    params.endAddress = this.data.endaddress
    params.endLongitude = this.endLongitude.toString();
    params.endLatitude = this.endLatitude.toString();
    params.goodsType = this.data.goodsType
    params.weight = this.data.weight
    params.distance = this.data.distance
    params.unitPrice = this.data.unitPrice
    params.goodsDesc = this.data.dec
    params.orderExpectDeliveryDateStr = this.data.deliverDate
    params.orderExpectDeliveryDate = this.data.deliverDate
    params.orderExpectArrivedDateStr = this.data.arriveDate
    params.orderExpectArrivedDate = this.data.arriveDate
    util.requestBase("/supplier/order/create", params, function(res) {
      console.log(res)
      if (res.data.status == 0) {
        wx.showToast({
          icon: 'none',
          title: '提交成功',
        })
      
        // wx.navigateBack({

        // })
      }
    }, function(res) {
      wx.showToast({
        icon: 'none',
        title: res.data.errMsg,
      })
    })
  }
})