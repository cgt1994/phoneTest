function requestBase(api, data, success, fail) {
  var app = getApp()
  var appData = app.globalData;
  console.log(appData.baseUrl + data)
  var openid = appData.openid
  var mytoken = appData.token

  console.log("open是" + openid)
  console.log("请求了" + api)
  wx.request({
    url: appData.baseUrl + api,
    method: "POST",
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'openId': openid,
      'token': mytoken
    },
    data: data,
    success: function(res) {
      if (res.data.status == 0) {
        success(res);
      } else {
        wx.hideLoading()
        wx.showToast({
          title: res.data.errMsg,
          icon: 'none',
          duration: 1000
        })
        fail(res);
        console.log(res)
      }
    },
    fail: function(res) {
     
      if (fail != null) {
       
        fail(res);
        console.log(res)
      }

    }
  })
}

function uploadPic(path, strtype,filepath, success, failres) {
  var app = getApp()
  var appData = app.globalData;
  console.log(appData.baseUrl)
  var openid = appData.openid
  var mytoken = appData.token

  console.log("地址" + appData.baseUrl + path)
  console.log("file" + filepath)
  wx.showLoading({
    title: '正在上传',
  })
  wx.uploadFile({

    url: appData.baseUrl + path,
    filePath: filepath,
    name: 'file',
    formData: {
      'bizType': strtype
    },
    header: {
      'openId': openid,
      'token': mytoken
    },
    success: function(res) {
      wx.hideLoading()
      success(JSON.parse(res.data))
      console.log(res)
    }
    ,fail:function(res){
      wx.hideLoading()
      failres(res)
    }
  })
}
module.exports = {
  requestBase: requestBase,
  uploadPic: uploadPic
}