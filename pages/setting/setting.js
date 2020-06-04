// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    puId: "123456789",
    password: "*******",
    character:"student",
    email:"111111@qq.com",
    showModal: false
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
/*  onLoad: function (options) {

    var user = wx.getStorageSync('userdata');
    this.setData({ puId:user.puId}),
    this.setData({ password:user.password })
    this.setData({ character:user.character })
    this.setData({ email:user.classname }) //从后端获取email

    var that = this;
    wx.request({
        url: 'http://' + app.globalData.apiUrl + '/bookshare?m=home&c=User&a=getProtectInfo&userId=' + app.globalData.userId,
        method: "GET",
        header: {
            'content-type': 'application/json'
        },
        success: function (res) {
            console.log(res.data)
            if (res.data == "fail") {
                wx.showToast({
                    title: '获取失败，请稍后重试！',
                    icon: 'success',
                    duration: 2000
                })
            } else {
                if (res.data[0]["protect"] == 0) {
                    that.setData({
                        checked: false
                    })
                } else if (res.data[0]["protect"] == 1) {
                    that.setData({
                        checked: true
                    })
                }

            }
            
        },
        fail: function () {
            wx.showToast({
                title: '获取失败，请稍后重试！',
                icon: 'false',
                duration: 2000
            })
        },
        complete: function () {
            that.setData({
                loading: false
            })
        }
    })
  },
*/
 //切换状态
 changeProtect: function (e) {
  var that = this;
  var protectStatu;
  var checkStatus = e.detail.value;
  
  if (checkStatus == true) {
      protectStatu = 1;
  } else {
      protectStatu = 0;
  }
  wx.request({
      url: 'http://' + app.globalData.apiUrl + '/bookshare?m=home&c=User&a=editProtectInfo&userId=' + app.globalData.userId + "&protect=" + protectStatu,
      method: "GET",
      header: {
          'content-type': 'application/json'
      },
      success: function (res) {
          if (res.data == "fail") {
              wx.showToast({
                  title: '修改失败，请稍后重试！',
                  icon: 'success',
                  duration: 2000
              })
          } else {
              // wx.showToast({
              //     title: '修改成功！',
              //     icon: 'success',
              //     duration: 2000
              // })
          }

      },
      fail: function () {
          wx.showToast({
              title: '修改失败，请稍后重试！',
              icon: 'false',
              duration: 2000
          })
      }
  })
},
//修改邮箱
formSubmit:function(e){
    var email =e.detail.value.email
        var student = wx.getStorageSync('student');
        var no=student.student.no;
        var url ="接口url地址";
        wx.request({
          url: url,
          method:'POST',
          data:{
          no:no,
          oldpwd:oldpwd,
          newpwd:newpwd
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (res) {
           //  console.log(res.data)
           wx.showModal({
               title: '提示',
               showCancel:false,
               confirmText:'知道了',
               content: content
               })
               wx.showToast({
                   title: '提交成功',
                   icon: 'success',
                   duration: 2000
               })
               this.hideModal();
          }

        })
},
//修改密码框
showDialogBtn: function() {
    this.setData({
        showModal: true
    })
},
/* 弹出框蒙层截断touchmove事件*/
preventTouchMove: function() {},
/* 隐藏模态对话框*/
hideModal: function() {
    this.setData({
        showModal: false
    });
},
/*对话框取消按钮点击事件*/
onCancel: function() {
    this.hideModal();
},

 //修改密码
changepassword:function(e){
   console.log(e)
   var oldpwd=e.detail.value.oldpwd;
   var newpwd =e.detail.value.newpwd;
   var user = wx.getStorageSync('userdata');
   var newpwd1 =e.detail.value.newpwd1;
   if(oldpwd==''||newpwd==''|| newpwd1==''){
     wx.showToast({
       title: '密码不能为空',
       icon:'none',
       duration:1000
     })
   }else if(newpwd!=newpwd1){
     wx.showToast({
       title: '两次密码输入不一样',
       icon: 'none',
       duration: 1000
     })
   }else{
     var student = wx.getStorageSync('student');
     var no=student.student.no;
     var url ="接口url地址";
     wx.request({
       url: url,
       method:'GET',
       data:{
       no:no,
       oldpwd:oldpwd,
       newpwd:newpwd
       },
       header: {
         'content-type': 'application/x-www-form-urlencoded' // 默认值
       },
       success: function (res) {
        //  console.log(res.data)
        wx.showModal({
            title: '提示',
            showCancel:false,
            confirmText:'知道了',
            content: content
            })

            wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2000
            })
            this.hideModal();
       }
     })
   }
  }

})