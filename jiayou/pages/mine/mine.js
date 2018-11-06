// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: "",
    latitude: "",
    markers: []

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
    this.listenerBtnGetLocation();
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

  }, /**
   * 监听定位到当前位置
   */
  listenerBtnGetLocation: function () {
    var that = this;
    wx.getLocation({
      //定位类型 wgs84, gcj02
      type: 'gcj02',
      // 41.76884111681454
      // 86.20064288380671
      success: function (res) {
        console.log(res)
        that.setData({
          latitude: 41.767667,
          longitude: 86.156019,
          markers: [
            {
              anchor: { x: .5, y: 0.8 },
              title: '创意图',
              callout: { content: '创意图地标建筑' },
              label:{
                cotent:"hellp",
                bgColor:"#f00"
      
              },
              iconPath: "/images/my_position.png",
              id: 0,
              latitude: 41.767667,
              longitude: 86.156019,
              width:40,
              height: 40
            },
            {
              iconPath: "/images/other_position.png",
              id: 1,
              latitude: 41.77315,
              longitude: 86.195229,
              width: 20,
              height: 20
            },
            {
              iconPath: "/images/other_position.png",
              id: 2,
              latitude: 41.7321,
              longitude: 86.1806,
              width: 20,
              height: 20
            },
            {
              iconPath: "/images/other_position.png",
              id: 3,
              latitude: 41.784249,
              longitude: 86.145175,
              width: 20,
              height: 20
            },
            {

              iconPath: "/images/other_position.png",
              id: 4,
              latitude: 41.743517,
              longitude: 86.128215,
              width: 20,
              height: 20
            }
          ]
        })


      },
      fail: function (err) {
        console.log(err)
      },
      complete: function (info) {
        console.log(info)
      },
    })
  },
})