// components/teacher/teacher_inf/post_course/post_course.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    coursename: "",
    teamrange:['1','2','3','4','5','6','7','8','9','10'],
    index:0,
    courseteam: 0,
    courseinf:"",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setContent:function(e){
      
      this.setData({
        index: e.detail.value
      })
      
    },
    formSubmit:function(e){
          var user = wx.getStorageSync('userdata')
          console.log(e);
          var couname = e.detail.value.coursename
          var couinf = e.detail.value.courseinf
          if(couname==''|| couinf==''){
            wx.showToast({
              title: '课程信息不能为空',
              icon:'none',
              duration:1000
            })
          }else {
            
          var url ="https://autumndreams.club/selcou/teacher/putcourse";
          wx.request({
            url: url,
            method:'GET',
            data:{         
              courseinfo:couinf,
              coursename:couname,   
              teaid:user.puId,
              number:Number(Number(this.data.index)+1)
            },
          success: function (res) {
            console.log(res);
            if (res.data.message == "success"){
              wx.showModal({
                 title: '课程发布成功！',
                 showCancel:false,
                 confirmText:'知道了',
                 })
            }else{
              wx.showModal({
                title: '课程发布失败！',
                showCancel:false,
                confirmText:'知道了',
                })
            }
            }
          })
          }
  },

  }
})
