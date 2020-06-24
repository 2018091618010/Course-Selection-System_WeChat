// components/student/student_inf/stu_news/stu_news.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  data: {
    teamnews:[], 
    coursenews:[],              
    hasList:false,  
    message:""        
  },
  lifetimes: {
    attached: function() {
        var myteam = wx.getStorageSync('myteamid')
        var that = this
         
        //根据我的teamid 查看申请我的队伍消息 
        var teamnews = []
        var coursenews = []
        for (let index = 0; index < myteam.length; index++) {

          wx.showToast({
          icon: 'loading',
          title: '消息更新中...',
          mask: true
          });
          //组队申请消息

          wx.request({
            url: "https://autumndreams.club/selcourse/Select/seeteammessage",
            method:'GET',
            data:{
              teamid:myteam[index]
            },
            success: function (res) {
            // 选择 "applystatus": "待同意" 的消息
                if(res.data.message == "success"){
                    var messagelist = res.data.data.subject
                    for (let index2 = 0; index2 < messagelist.length; index2++) {
                      if(messagelist[index2].message.applystatus == "待同意")
                        teamnews.push(messagelist[index2]); 
                    }
                  }
                }
            })      
          //申请课程反馈的消息
          wx.request({
              url: "https://autumndreams.club/selcourse/Select/seejoinclassmessage",
              method:'GET',
              data:{
                teamid:myteam[index]
              },
              success: function (res) {
                    //根据teamid查看team信息
                    if(res.data.message == "success"){
                      wx.request({
                        url: "https://autumndreams.club/selcourse/student/selectteam",
                        method:'GET',
                        data:{
                          id:myteam[index]
                        },
                        success: function (res) {
                          if(res.data.message == "success"){ 
                            coursenews.push(res.data.data.team.coursename);
                          }
                        }
                      })  
                    }
              }
            })  
          } 

        setTimeout(() => {
          that.setData({
                teamnews: teamnews,
                coursenews: coursenews,
                hasList:true
              });    
        }, 1000); //延迟1s
        

    },
    ready: function () {
      // 组件布局完成，这时可以获取节点信息，也可以操作节点
    },
  },
    
  /**
   * 组件的方法列表
   */
  methods: {

    deleteteamlist(e) {
      const index = e.currentTarget.dataset.index;
      let teamnews = this.data.teamnews;
      teamnews.splice(index,1);
      this.setData({
        teamnews: teamnews
      });
      if(!teamnews.length){
        this.setData({
          hasList: false
        });
      }
    },

    accept(e){
      var that = this
      var teamid = e.currentTarget.dataset.teamid
      var stuid = e.currentTarget.dataset.stuid
      wx.request({
        url: "https://autumndreams.club/selcourse/Select/dealteammessage",
        method:'GET',
        data:{
          status:"已同意",
          stuid:stuid,
          teamid:teamid
        },
        success: function (res) {
          console.log(res.data)
          if(res.data.code == 0){
            if (res.data.message == "该同学加入其他队伍") {
              wx.showModal({
                title: '该同学已经加入其他队伍！',
                showCancel:false,
                confirmText:'拒绝',
                confirmColor:'red'
                })
            }
            else{
              wx.showModal({
                title: '已接受该同学！',
                showCancel:false,
                confirmText:'知道了',
                })
            that.deleteteamlist(e) 
            }
          }
        }  
      })    
      },
    //拒绝
    refuse(e){
      var that = this
      var teamid = e.currentTarget.dataset.teamid
      var stuid = e.currentTarget.dataset.stuid
      wx.request({
        url: "https://autumndreams.club/selcourse/Select/dealteammessage",
        method:'GET',
        data:{
          status:"已拒绝",
          stuid:stuid,
          teamid:teamid
        },
        success: function (res) {
          console.log(res.data)
          if(res.data.code == 0){
            wx.showModal({
                title: '已拒绝该同学！',
                showCancel:false,
                confirmText:'知道了',
                })
            that.deleteteamlist(e)
          }
        }  
      })       
    },
    },
})
