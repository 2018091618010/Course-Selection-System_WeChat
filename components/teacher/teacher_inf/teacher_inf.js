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
      url: '/components/teacher/teacher_inf/tea_news/tea_news',
  })
  },
  openPost_course:function(){
    //打开发布课程
    wx.navigateTo({
      url: '/components/teacher/teacher_inf/post_course/post_course',
  })
  },
  openMystudents:function(){
    //打开我的学生
    wx.navigateTo({
      url: '/components/teacher/teacher_inf/tea_students/tea_students',
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
    //打开设置
    wx.navigateTo({
        url: '/pages/setting/setting',
    })
  },
  onShow: function () {
    wx.setTabBarItem(
    {
      index: 1,
      text: 'text',
      iconPath: '/path/to/iconPath',
      selectedIconPath: '/path/to/selectedIconPath'
    },
    {
      index: 2,
      text: 'text',
      iconPath: '/path/to/iconPath',
      selectedIconPath: '/path/to/selectedIconPath'
    }
    )
  },
}
})