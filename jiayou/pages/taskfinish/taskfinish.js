// pages/taskfinish/taskfinish.js
var util = require("../../utils/network.js");
var orderUrl="";

var orderNumber;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startName: "",
    endName: "",
    gooddec: "",
    src: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("跳转后")
    console.log(options)
    orderNumber = options.orderNumber
   
 
    this.setData({
      startName: options.startName,
      endName: options.endName,
      gooddec: options.goodDes
    })
   
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
  uploadMd: function(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log(res)
        that.setData({
          src: res.tempFilePaths[0]
        })
  
        util.uploadPic('/driver/upload', "driverOrder", res.tempFilePaths[0], function(res) {
          orderUrl = res.result.imgUrl

        }, function(res) {
          console.log(res)
          console.log(url1 + "222222--")
        })
  


      },
      fail: function(error) {
        console.error("调用本地相册文件时出错")
        console.warn(error)
      },
      complete: function() {

      }

    })
  },
  compelte: function(e) {
    if (orderUrl.length==0){
      wx.showModal({
        title: '',
        showCancel: false,
        content: '请上传面单照片',
      })
      return
    }
    var parms=new Object()
    parms.operateCode=3;
    parms.completeUrl=orderUrl
    parms.orderNum = orderNumber
    wx.showLoading({
      title: '正在提交',
    })
    util.requestBase("/driver/order/operate", parms,function(res){
      wx.hideLoading()
      wx.showToast({
        title:"成功",
        icon: 'none',
        duration: 1000
      })
      wx.navigateBack({

      })
      var pages = getCurrentPages();
      if (pages.length > 1) {

        //上一个页面实例对象


        var prePage = pages[pages.length - 2];

        //关键在这里

        prePage.loadData()


      }
    })
  }
})