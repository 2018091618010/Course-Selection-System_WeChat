Component({

 
  data: {
    user:"",
    name:"",
    character:"",
    major:""
  },
  
  lifetimes: {
    attached: function() {
    var user = wx.getStorageSync('userdata')
    var name = wx.getStorageSync('name')
    var major = wx.getStorageSync('major')
    this.setData({
      user:user.puId,
      name:name,
      character:"同学",
      major:major
    })
     var myteamid = []
    //请求获得我的队伍信息，判断我是否为队长，将我是队长的teamid存储起来
     wx.request({
         url: "https://autumndreams.club/selcourse/Select/myteam",
         method:'GET',
         data:{
            id:user.puId
         },
         success: function (res) {
          if(res.data.message == "success"){ 
            var team = res.data.data.subject
           for (let index = 0; index < team.length; index++) {
             if(team[index].leaderid == user.puId){
               myteamid.push(team[index].TeamInfo.teamid);
             }
           }
           wx.setStorageSync('myteamid',myteamid)
          } 
         }
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