// pages/setting/setting.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    puId:"",
    oldpassword:"",
    name:"",
    character:"",
    contractway:"",
    newpassword:"",
    showModal: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user = wx.getStorageSync('userdata')
    var name = wx.getStorageSync('name')
    this.setData({
        puId:user.puId,
        name:name,
        oldpassword:user.password,
        newpassword:user.password,
        character:user.character})
   //从后端获取contractway this.setData({ contractway:contractway }) 
  },
//修改
formSubmit:function(e){
        var contractway = e.detail.value.contractway
        var user = wx.getStorageSync('userdata')
        if(user.character == "teacher"){
          var url ="https://autumndreams.club/selcou/teacher/corrpwd";
                  wx.request({
                    url: url,
                    method:'GET',
                    data:{
                      password:this.data.newpassword,
                      phone:contractway,
                      teaid:this.data.puId,
                      teaname:this.data.name
                    },
                    success: function (res) {
                    if(res.data.message == "success"){
                      wx.showModal({
                        title: '提交成功',
                        showCancel:false,
                        confirmText:'知道了'
                        })
                    }else{
                      wx.showModal({
                        title: '提交失败',
                        showCancel:false,
                        confirmText:'知道了'
                        })
                    }
                    }
                  })

        }else if(user.character == "student"){
          var url ="https://autumndreams.club/selcourse/student/stuupdatepass";
          wx.request({
            url: url,
            method:'GET',
            data:{
              id:this.data.puId,
              npass:this.data.newpassword,
              opass:this.data.oldpassword,
            },
            success: function (res) {
            if(res.data.message == "success"){
              wx.showModal({
                title: '提交成功',
                showCancel:false,
                confirmText:'知道了'
                })
            }else{
              wx.showModal({
                title: '提交失败',
                showCancel:false,
                confirmText:'知道了'
                })
            }
            }
          })

        }
        
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
   var oldpwd=e.detail.value.oldpwd;
   var newpwd =e.detail.value.newpwd;
   var newpwd1 =e.detail.value.newpwd1;
   if(oldpwd==''||newpwd==''|| newpwd1==''){
     wx.showToast({
       title: '密码不能为空',
       icon:'none',
       duration:1000
     })
   }else if(oldpwd!=this.data.oldpassword){
    wx.showToast({
      title: '原密码不正确',
      icon: 'none',
      duration: 1000
    })
   }
   else if(newpwd!=newpwd1){
     wx.showToast({
       title: '两次密码输入不一样',
       icon: 'none',
       duration: 1000
     })
   }else{
    this.setData({ 
        newpassword:newpwd
    }),     
    this.hideModal();
   }
  }
})