// components/student/student_inf/stu_team/stu_team.js

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
      CourseSelectInfolist:[],
      coursename:"",
      teamleader:"",
      teacher:"",
      teamid:""
    },

    lifetimes: {
      attached: function() {
      //获取待审核的队伍信息
      var that = this
      var user = wx.getStorageSync('userdata')
      wx.request({
          url: "https://autumndreams.club/selcourse/Select/mycourse",
          method:'GET',
          data:{
             id:user.puId
          },
          success: function (res) {
           //  console.log(res.data)
           that.setData({
            CourseSelectInfolist: res.data.data.CourseSelectInfolist,
            coursename:res.data.data.课程名字,
            teamleader:res.data.data.队长姓名,
            teamid:res.data.data.队伍编号,
            teacher:res.data.data.老师姓名
            });
          }
      })
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
  }  
})
