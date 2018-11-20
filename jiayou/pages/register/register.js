// pages/register.js
var toastUtil = require("../../utils/util.js");
var agree;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttons: [{
      id: 1,
      name: '注册司机'
    }, {
      id: 2,
      name: '注册厂商'
    }],
    myType: "",
    phoneNumber: "",
    password: "",
    verifyCode: "",
    supplier: "",
    address: "",
    contactphone: "",
    disabled: true,
    verifyabled: false,
    car: ""

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
  registerRadioChange: function(e) {

    console.log("选择了" + e.detail.value)
    this.setData({
      disabled: false,
      myType: e.detail.value
    })
  },
  inputPhoneNumber: function(e) {
    this.data.phoneNumber = e.detail.value
  },
  inputCar: function(e) {
    this.data.car = e.detail.value
  },
  // inputPassword: function (e) {
  //   this.data.password = e.detail.value
  // },
  intputVerifyCode: function(e) {

    this.data.verifyCode = e.detail.value
  },
  inputSupplier: function(e) {
    this.data.supplier = e.detail.value
  },
  inputAddress: function(e) {
    this.data.address = e.detail.value
  },
  inputContactPhone: function(e) {

    this.data.contactphone = e.detail.value
  },
  getVerfiyCode: function(e) {
    var that = this;

    if (this.data.phoneNumber.length < 11) {
      wx.showToast({
        icon: 'none',
        title: '手机号不能小于11位',
      })
      return
    }
    this.setData({
      verifyabled: true
    })
    var util = require("../../utils/network.js");
    //写入参数
    var params = new Object()
    params.telephone = this.data.phoneNumber
    util.requestBase("/driver/registryCode", params, function(res) {
      console.log(res)
      that.setData({
        verifyabled: false
      })
      if (res.data.status == 0) {
        wx.showToast({
          icon: 'none',
          title: '发送成功',
        })
      }
    }, function(res) {
      that.setData({
        verifyabled: false
      })
      wx.showToast({
        icon: 'none',
        title: '发送失败',
      })
    })

  },
  autoLogin: function() {
    var data = getApp().globalData
    var util = require("../../utils/network.js");
    wx.showLoading({
      title: '正在登陆中',
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    wx.login({
      //获取code
      success: function(login) {
        var jscode = login.code //返回code
        console.log(jscode)
        //写入参数
        var params = new Object()
        params.jsCode = jscode
        util.requestBase("/wechat/applet/autoLogin", params, function(res) {
            console.log(res)
            data.openid = res.data.result.openId
            data.userInfo = res.data.result
            data.token = res.data.result.token
            console.log("请求回来的result是" + data.userInfo)
            wx.hideLoading()
            console.log("请求回来的openid是" + data.openid)

            wx.navigateBack({
              delta: -1
            });
          },
          function(res) {
            wx.hideLoading()
          })
      }
    })
  },
  jumpToProtocal: function(e) {
    var url = "";
    if (this.data.myType = "driver") {
      url = "https://gateway.xiaofeiupup.top/driver/registry/protocol"
    } else {
      url = "https://gateway.xiaofeiupup.top/supplier/registry/protocol"
    }
    wx.navigateTo({
      url: '../web/web?url=' + url,
    })
  },
  checkChange: function(e) {
    console.log("checkFac" + e.detail.value)
    agree = e.detail.value;
  },
  register: function(e) {
    var that = this;
    var util = require("../../utils/network.js");
    //写入参数
    var params = new Object()




    if (this.data.myType == 'driver') {
      if (this.data.phoneNumber.length < 11) {
        toastUtil.showToast("手机号长度不能小于11位")
        return
      }
      if (this.data.car.length < 2) {
        toastUtil.showToast("必须正确填写车型")
        return
      }
      if (this.data.verifyCode.length != 6) {
        toastUtil.showToast("验证码必须为6位")
        return
      }
      if (agree!="driver") {
        toastUtil.showToast("请先阅读协议并勾选")
        return
      }
      params.entryTelephone = this.data.phoneNumber
      params.vehicleModel = this.data.car
      params.smsVerifyCode = "888888"
      util.requestBase("/driver/doRegistry", params, function(res) {
        console.log(res + " ****" + (res.data.status == 0))
        if (res.data.status == 0) {
          that.autoLogin()
        }
      })
    } else {
      if (agree != "supplier") {
        toastUtil.showToast("请先阅读协议并勾选")
        return
      }
      params.supplierName = this.data.supplier
      params.telephone = this.data.contactphone
      params.supplierAddress = this.data.address
      util.requestBase("/supplier/doRegistry", params, function(res) {
        console.log(res)
        if (res.data.status == 0) {
          that.autoLogin()
        }
      })
    }

  }
})