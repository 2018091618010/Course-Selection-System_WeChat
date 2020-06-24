
Component({

  data: {
    courseid:"",
    teaminf:""
  },
  methods:{

  formSubmit: function (e) {
    var user = wx.getStorageSync('userdata')
    //console.log(e.detail.value);
    if (e.detail.value.courseid.length == 0) {
      
      wx.showToast({
        title: '课程ID不能为空!',
        icon: 'none',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (e.detail.value.teaminf.length == 0) {
      wx.showToast({
        title: '队伍描述不能为空!',
        icon: 'none',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
      wx.request({
       url: 'https://autumndreams.club/selcourse/student/createteam',
        method: "POST",
        data: { 
          courseid2: e.detail.value.courseid, 
          stuid2: user.puId, 
          teamid: "",
          teaminfo: e.detail.value.teaminf,
          teamstatus: ""
        },
        //header: {"Content-Type":"application/x-www-form-urlencoded"},
        success: function (res) {
          console.log(res.data);
          if(res.data.message == "success"){ 
            wx.showToast({
              title: '队伍创建成功',
              image: '/img/loginsuccess.png',
              duration: 2000
            })
          }
          else if(res.data.message == "不可重复创建队伍"){
            wx.showModal({
              title: '不可重复创建队伍！',
              showCancel:false,
              confirmText:'知道了',
              confirmColor:'red'
              })
          }else{
            wx.showModal({
              title: '队伍创建失败！',
              showCancel:false,
              confirmText:'知道了',
              confirmColor:'red'
              })
          }
        }
      })
    }
  },
},
})
