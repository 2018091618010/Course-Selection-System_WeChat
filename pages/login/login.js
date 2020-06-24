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
          url: 'https://autumndreams.club/selcou/teacher/login',
          data: {
            password: this.data.password,
            teaid: this.data.puId
          },
          method: "POST",
          header: {"Content-Type":"application/x-www-form-urlencoded"},
          success: function (res) {
            if (res.data.code == 0) {
              wx.setStorageSync('userdata',that.data)//设置缓存
              wx.setStorageSync('name',res.data.data.teaname)
              wx.showToast({
                    title: '登录成功',
                    image: '/img/loginsuccess.png',
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
          url: 'https://autumndreams.club/selcourse/student/stulogin',
          data: {
            id: this.data.puId,
            pas: this.data.password,
          },
          method: "GET",
          success: function (res) {
            if (res.data.message == "success") {
              wx.setStorageSync('userdata',that.data)//设置当前用户信息缓存
              wx.setStorageSync('name',res.data.data.Student.stuname)
              wx.setStorageSync('major',res.data.data.Student.stumajor)
              wx.showToast({
                    title: '登录成功',
                    image: '/img/loginsuccess.png'
                  })
              setTimeout(function () {
                    wx.navigateTo({
                      url: '../student/student'
                    })
                  }, 1000) //延迟1s跳转    
            }
            else if(res.data.message == "账号不存在"){
              wx.showModal({
                title: '账号不存在',
                showCancel:false,
                confirmText:'知道了',
                confirmColor:"red"
                })
            }
            else if(res.data.message == "密码错误"){
              wx.showModal({
                title: '密码错误',
                showCancel:false,
                confirmText:'知道了',
                confirmColor:"red"
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