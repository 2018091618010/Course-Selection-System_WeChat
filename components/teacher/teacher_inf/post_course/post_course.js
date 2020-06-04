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

  }
})
