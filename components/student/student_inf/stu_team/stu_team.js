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
      scrollindex:0,  //当前页面的索引值
      totalnum:0,  //总共页面数
      starty:0,  //开始的位置x
      endy:0, //结束的位置y
      critical: 100, //触发翻页的临界值
      margintop:0,  //滑动下拉距离
      teamlist:[],
      apply:false
    },
    lifetimes: {
      attached: function() {
      var that = this
      var user = wx.getStorageSync('userdata')
      wx.request({
          url: "https://autumndreams.club/selcourse/Select/myteam",
          method:'GET',
          data:{
             id:user.puId
          },
          success: function (res) {
            if(res.data.message == "success"){ 
              that.setData({
                totalnum:(res.data.data.subject).length,
                teamlist:res.data.data.subject,
                });  
                //判断我是否为该队伍队长 以及队伍状态是否为待审核 
              var curteam = that.data.teamlist[that.data.scrollindex]
              if(curteam.leaderid == user.puId && curteam.TeamInfo.teamstatus == "待提交"){
                  that.setData({
                    apply:true
                  })
              }
            }
          }
      })
 
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {

    joincourse:function(){
      var that = this
      console.log(that.data.scrollindex)
      console.log(that.data.teamlist[that.data.scrollindex])
      var curteam = that.data.teamlist[that.data.scrollindex]
      wx.request({
        url: "https://autumndreams.club/selcourse/Select/joinclass",
        method:'GET',
        data:{
           teamid:curteam.TeamInfo.teamid
        },
        success: function (res) {
          if(res.data.message == "success"){
            //console.log(curteam.TeamInfo.teamid) 
            //console.log(res) 
            wx.showModal({
              title: '申请成功！',
              showCancel:false,
              content:'请耐心等待老师的回复',
              confirmText:'知道了'
              })
          }
        }
    })
      
    },
    scrollTouchstart:function(e){
      let py = e.touches[0].pageY;
      this.setData({
        starty: py
      })
    },
    scrollTouchmove:function(e){
      let py = e.touches[0].pageY;
      let d = this.data;
      this.setData({
        endy: py,
      })
      if(py-d.starty<100 && py-d.starty>-100){    
        this.setData({
          margintop: py - d.starty
        })
      }
    },
    scrollTouchend:function(e){
      let d = this.data;
     
      if(d.endy-d.starty >100 && d.scrollindex>0){
        this.setData({
          scrollindex: d.scrollindex-1
        })
      }else if(d.endy-d.starty <-100 && d.scrollindex<this.data.totalnum-1){
        this.setData({
          scrollindex: d.scrollindex+1
        })
      }
      this.setData({
          starty:0,
          endy:0,
          margintop:0
      })
      //判断我是否为该队伍队长 以及队伍状态是否为待审核 
      var user = wx.getStorageSync('userdata')
      var curteam = this.data.teamlist[this.data.scrollindex]
      if(curteam.leaderid == user.puId && curteam.TeamInfo.teamstatus == "待提交"){
        this.setData({
          apply:true
        })
      }
      else{
        this.setData({
          apply:false
        })
      }
    },
  }  
})
