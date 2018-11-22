//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      '../../images/introduce.jpg',
      '../../images/introduce_2.jpg'

    ],
    // 对话框
    hiddenLoading: true,
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    circular: true,
    test:{
      p:"a"
    }
  },
  onReady: function() {
    var data=this.data
    console.log(data.test.q + "!!" + data.test.hasOwnProperty("p") + " " + data.test.hasOwnProperty("q"))
  },
  onLoad: function() {
    var that = this
   
  },
   onPullDownRefresh: function () {
    wx.showToast({
      title: '刷新了',
    })
 
  },
  jumpToMap:function(e){
    wx.navigateTo({
      url: '../map/map',
    })
  },
  onShareAppMessage: function () {

  }
})