Component({

 
  data: {
    user:"",
    name:"",
    character:""
  },
  
  lifetimes: {
    attached: function() {
    var user = wx.getStorageSync('userdata')
    var name = wx.getStorageSync('name')
    this.setData({
      user:user.puId,
      name:name,
      character:"老师"
    })
  },
  },
  
  methods:{

    openMynews:function(){
      //打开我的消息
      wx.navigateTo({
        url: '/components/student/student_inf/stu_news/stu_news',
    })
    },
    openMyteam:function(){
      //打开我的队伍
      wx.navigateTo({
        url: '/components/student/student_inf/stu_team/stu_team',
    })
    },
    openMycourse:function(){
      //打开我的选课
      wx.navigateTo({
        url: '/components/student/student_inf/stu_course/stu_course',
    })
    },
    openOpinion:function(){
      //打开意见反馈
      wx.navigateTo({
          url: '/pages/opinion/opinion',
      })
    },

    aboutUs:function(){
      //打开关于我们
      wx.navigateTo({
          url: '/pages/aboutUs/aboutUs',
      })
     },

    openSetting:function(){
      wx.navigateTo({
          url: '/pages/setting/setting',
      })
    },
 
}
})