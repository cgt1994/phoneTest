// pages/deliverinfo/deliverinfo.js
var util = require("../../utils/network.js");
var url1 = ""
var url2 = ""
var url3 = ""
var url4 = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idfront: "",
    idback: "",
    licensefrist: "",
    licensesencond: ""
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
  uploadIdCardFront: function(e) {
    var that = this
    var data = getApp().globalData

    wx.chooseImage({
      count: 1,
      success: function(res) {
        console.log(res)
        that.setData({
          idfront: res.tempFilePaths[0]
        })

        util.uploadPic('/driver/upload', "driverIdCard_front", res.tempFilePaths[0], function(res) {
          console.log(res + "1111111--")
          url1 = res.result.imgUrl
        }, function(res) {
          console.log(res)
          console.log(url1 + "222222--")
        })
        console.log(data.baseUrl + '/driver/upload', "driverIdCard")


      },
      fail: function(error) {
        console.error("调用本地相册文件时出错")
        console.warn(error)
      },
      complete: function() {

      }

    })
  },
  uploadIdCardBack: function(e) {
    var that = this
    var data = getApp().globalData

    wx.chooseImage({
      count: 1,
      success: function(res) {
        console.log(res)
        that.setData({
          idback: res.tempFilePaths[0]
        })

        util.uploadPic('/driver/upload', "driverIdCard_back", res.tempFilePaths[0], function(res) {
          console.log(res)
          url2 = res.result.imgUrl
        }, function(res) {
          console.log(res)
        })
        console.log(data.baseUrl + '/driver/upload', "driverIdCard")


      },
      fail: function(error) {
        console.error("调用本地相册文件时出错")
        console.warn(error)
      },
      complete: function() {

      }

    })
  },
  uploadLicenseFront: function(e) {
    var that = this
    var data = getApp().globalData

    wx.chooseImage({
      count: 1,
      success: function(res) {
        console.log(res)
        that.setData({
          licensefrist: res.tempFilePaths[0]
        })

        util.uploadPic('/driver/upload', "driverLicense_first", res.tempFilePaths[0], function(res) {
          console.log(res)
          url3 = res.result.imgUrl
        }, function(res) {
          console.log(res)
        })
        console.log(data.baseUrl + '/driver/upload', "driverIdCard")


      },
      fail: function(error) {
        console.error("调用本地相册文件时出错")
        console.warn(error)
      },
      complete: function() {

      }

    })
  },
  uploadLicenseBack: function(e) {
    var that = this
    var data = getApp().globalData
    wx.chooseImage({
      count: 1,
      success: function(res) {
        console.log(res)
        that.setData({
          licensesencond: res.tempFilePaths[0]
        })
        var util = require("../../utils/network.js");
        util.uploadPic('/driver/upload', "driverLicense_second", res.tempFilePaths[0], function(res) {
          console.log(res)
          url4 = res.result.imgUrl
        }, function(res) {
          console.log(res)
        })
        console.log(data.baseUrl + '/driver/upload', "driverIdCard")


      },
      fail: function(error) {
        console.error("调用本地相册文件时出错")
        console.warn(error)
      },
      complete: function() {

      }

    })
  },
  apply: function(e) {
    if (url1.length == 0) {
      wx.showModal({
        title: '',
        showCancel: false,
        content: '请上传身份证正面照片',
      })
      return
    } else if (url2.length == 0) {
      wx.showModal({
        title: '',
        showCancel: false,
        content: '请上传身份证背面照片',
      })
      return
    } else if (url3.length == 0) {

      wx.showModal({
        title: '',
        showCancel: false,
        content: '请上传驾驶证正面照片',
      })
      return
    } else if (url4.length == 0) {
      wx.showModal({
        title: '',
        showCancel: false,
        content: "请上传驾驶证背面照片",
      })
      return
    }
    var params = new Object();
    params.idCardImgFrontUrl = url1;
    params.idCardImgBackUrl = url2;
    params.driverLicenseImgUrlFirst = url3;
    params.driverLicenseImgUrlSecond = url4;
    wx.showLoading({
      title: '正在上传中',
    })
    util.requestBase("/driver/approve/apply", params, function(e) {
      wx.showToast({
        title: '提交成功',
      })
      wx.navigateBack({
      
      })
    })
  }

})