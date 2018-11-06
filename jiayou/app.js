//app.js
//获取应用实例

var app = getApp();
App({

  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this
    // // 登录
    wx.login({
        //获取code
        success: function(login) {
          var jscode = login.code //返回code
          console.log(jscode)

          var util = require("/utils/network.js");
          //写入参数
          var params = new Object()
          params.jsCode = jscode
          wx.showLoading({
            title: '正在登陆中',
            mask: true,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
          util.requestBase("/wechat/applet/autoLogin", params, function(res) {
              console.log(res)
              that.globalData.openid = res.data.result.openId
              that.globalData.userInfo = res.data.result
              that.globalData.token=res.data.result.token
              console.log("请求回来的result是" + that.globalData.userInfo)
              wx.hideLoading()
              console.log("请求回来的openid是" + that.globalData.openid)
            },
            function(res) {
              wx.hideLoading()
            })
        }
      }),
      // console.log(login.code)
      //     wx.request({
      //       url: 'https://api.weixin.qq.com/sns/jscode2session',
      //       data: {
      //         appid: "wx3947d551d5eba910",
      //         secret: "183a068c91756586438c5a647878ee87",
      //         js_code: login.code,
      //         grant_type: "authorization_code",
      //       },
      //       //获取openid接口  
      //       method: 'GET',
      //       success: function (res) {
      //         console.log(res.data)
      //         var code = res.errcode
      //         var openid = res.data.openid
      //         // if(openid!=null){
      //         //   wx.redirectTo({
      //         //     url: '',
      //         //   })
      //         // }
      //     //     console.log(openid)
      //     //     if (openid !== undefined && openid !== null && openid !== '') {
      //     //       // that.setData({
      //     //       //   hiddenLoading: true
      //     //       // })
      //     //     }

      //     //     console.log(res.data.openid)

      //     //     // var OPEN_ID = res.data.openid;//获取到的openid  
      //     //     // var SESSION_KEY = res.data.session_key;//获取到session_key  
      //         // console.log(OPEN_ID.length)
      //         // console.log(SESSION_KEY.length)
      //         // that.setData({

      //         // })
      //       }

      //     })
      //   }
      // })
      // wx.login({
      //   success: res => {
      //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
      //   }
      // })
      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      })
  },
  globalData: {
    baseUrl: "https://gateway.xiaofeiupup.top",
    userInfo: null,
    token: "",
    openId: null,
    stauts:-1

  }
})