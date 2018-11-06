// pages/map/map.js
var itemInfo = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mylongitude: '',
    mylatitude: '',
    markers: [],
    points: [],
    polylines: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(JSON.parse(options.info))
    var item = JSON.parse(options.info)
    this.itemInfo = JSON.parse(options.info)
    // console.log(item.startName)
    let marks = []
    let startmarker = {
      iconPath: "/images/from_pic.png",
      id: 0,
      title: item.startName,
      latitude: item.startLatitude,
      longitude: item.startLongitude,
      width: 25,
      height: 25,
      callout: {
        content: "起点:" + item.startName,
        display: "ALWAYS",
        fontSize: 12,
        color: "#000"
      },

    };
    let endmarker = {
      iconPath: "/images/to_pic.png",
      id: 1,
      title: item.endName,
      latitude: item.endLatitude,
      longitude: item.endLongitude,
      width: 25,
      height: 25,
      callout: {
        content: "终点:" + item.endName,
        display: "ALWAYS",
        fontSize: 12,
        color: "#000"
      }

    };
    // console.log("startMake" + startmarker.latitude + " " + startmarker.longitude + " " + startmarker.callout.content)
    // console.log("endmarker" + endmarker.latitude + " " + endmarker.longitude)
    marks.push(startmarker)
    marks.push(endmarker)

    var that = this;
   
    var that = this
    var util = require("../../utils/network.js");
    //写入参数
    var params = new Object()
    params.origin = item.startLatitude + "," + item.startLongitude
    params.destination = item.endLatitude + "," + item.endLongitude
    let poylines = [];
    poylines.push({
      longitude: parseFloat(item.startLongitude),
      latitude: parseFloat(item.startLatitude)
    })
    console.log(poylines);
    util.requestBase("/planWay", params, function (res) {
      var steps = res.data.result.result.routes[0].steps
      for (var i = 0; i < steps.length; i++) {
       var  arrs= steps[i].path.split(";")
       for(var k=0;k<arrs.length;k++){
         var datas=arrs[k].split(",")
         poylines.push({
           longitude: parseFloat(datas[0]),
           latitude: parseFloat(datas[1])
          })
       }
        // if (i == 0) {
        //   poylines.push({
        //     longitude: parseFloat(steps[i].start_location.lng),
        //     latitude: parseFloat(steps[i].start_location.lat)
        //   })
        // }
        // poylines.push({
        //   longitude: parseFloat(steps[i].end_location.lng),
        //   latitude: parseFloat(steps[i].end_location.lat)
        // })

      }
      poylines.push({
        longitude: parseFloat(item.endLongitude),
        latitude: parseFloat(item.endLatitude)
      })
      for (var i = 0; i < poylines.length; i++) {
        console.log("step" + i + " " + poylines[i].longitude + " " + poylines[i].latitude);
      }
      wx.getLocation({
        type: 'gcj02',
        success: (res) => {
          that.setData({
            mylongitude: res.longitude,
            mylatitude: res.latitude

          })
          that.setData({
            markers: marks,
            points: [{
              longitude: item.startLongitude,
              latitude: item.startLatitude

            }, {
              longitude: item.endLongitude,
              latitude: item.endLatitude
            }]
            ,
            polylines: [{
              color: "#FF249aff",
              width: 2,
              arrowLine: true,
              points:poylines
              // points: [{
              //   longitude: 86.14375,
              //   latitude: 41.62275

              // }, {
              //   longitude: 86.14345,
              //   latitude: 41.62306
              // },
              // {
              //   longitude: 86.13563,
              //   latitude: 41.62884
              // }, {
              //   longitude: 86.18189,
              //   latitude: 41.71982
              // }
              //   , {
              //   longitude: 86.18178,
              //   latitude: 41.71988
              // },
              // {
              //   longitude: 86.17519,
              //   latitude: 41.72575
              // }]
            }]

          })
          console.log(that.data.polylines[0]);
        }
      })
      // console.log("一共有" + poylines.length);
      // console.log("修改后" + that.data.polylines[0].points.length)
      // that.setData({
      //   markers: marks,
      //   points: [{
      //     longitude: item.startLongitude,
      //     latitude: item.startLatitude

      //   }, {
      //     longitude: item.endLongitude,
      //     latitude: item.endLatitude
      //   }],
      //   polylines: [{
      //     color: "#FF000000",
      //     width: 2,
      //     arrowLine: true,
      //     points: [{
      //       longitude: 86.14375,
      //       latitude: 41.62275

      //     }, {
      //       longitude: 86.14345,
      //       latitude: 41.62306
      //     },
      //     {
      //       longitude: 86.13563,
      //       latitude: 41.62884
      //     }, {
      //       longitude: 86.18189,
      //       latitude: 41.71982
      //     }
      //       , {
      //       longitude: 86.18178,
      //       latitude: 41.71988
      //     },
      //     {
      //       longitude: 86.17519,
      //       latitude: 41.72575
      //     }
      //     ],
      //     dottedLine: false,
      //     borderWidth: 1,
      //   }]

      // })
   


    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  getPoylines: function(item,marks) {
   
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(item) {

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

  }
})