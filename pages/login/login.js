// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    puId: "",
    password: "",
    character:""
  },

  choose: function (e) {
    this.setData({
      character: e.detail.value
    });
  },
  inputa: function (e) {
    this.setData({
      puId: e.detail.value
    });
  },
  inputb: function (e) {
    this.setData({
      password: e.detail.value
    });
  },

  login: function (e) {
      var that = this;
      if (this.data.character=="teacher"){
        wx.request({
          url: 'http://www.justinstar.top/selcou/teacher/login',
          data: {
            password: this.data.password,
            teaid: this.data.puId
          },
          method: "GET",
          success: function (res) {
            if (res.data.message == "success") {
              wx.setStorageSync('userdata',that.data)//设置缓存
              wx.setStorageSync('name',res.data.data.teaname)
              wx.showToast({
                    title: '登录成功',
                    image: '/img/loginsuccess.png'
                  })
              setTimeout(function () {
                    wx.navigateTo({
                      url: '../teacher/teacher'
                    })
                  }, 1000) //延迟1s跳转    
            }
            else {
              wx.showToast({
                title: '登录失败',
                image: '/img/loginfail.png'
              })
            }
          }
        })
     }
      else if(this.data.character=="student") {
        wx.request({
          url: 'http://www.justinstar.top/selcouse/student/stulogin',
          data: {
            id: this.data.puId,
            pas: this.data.password,
          },
          method: "GET",
          success: function (res) {
            if (res.data.message == "success") {
              wx.setStorageSync({'userdata':that.data})//设置当前用户信息缓存
              wx.showToast({
                    title: '登录成功',
                    image: '/img/loginsuccess.png'
                  })
              setTimeout(function () {
                    wx.navigateTo({
                      url: '../teacher/teacher'
                    })
                  }, 1000) //延迟1s跳转    
            }
            else {
              wx.showToast({
                title: '登录失败',
                image: '/img/loginfail.png'
              })
            }
          }
        })
      }
      else {
        wx.showToast({
          title: '请选择身份！',
          image: '/img/loginfail.png'
        })
      }
  },
})