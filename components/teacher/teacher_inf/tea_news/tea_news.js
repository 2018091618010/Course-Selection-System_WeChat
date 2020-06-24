// components/student/student_inf/stu_news/stu_news.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  data: {
    newstype:0,
    news:[],               // 消息列表
    hasList:false,          // 列表是否有数据
    teamlist:[],
    obj:{
        name:"hello"
    }
  },
 
  lifetimes: {
    attached: function() {
    //获取待审核的队伍信息
    var that = this
    var user = wx.getStorageSync('userdata')
    wx.request({
        url: "https://autumndreams.club/selcou/teacher/showcouteam",
        method:'GET',
        data:{
            teaid:user.puId
        },
        success: function (res) {
         if(res.data.code == 0){
         that.setData({
            news: res.data.data.teamlist,
          });
        }
      }
    })
  },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
    onShow() {
      wx.showToast({
        icon: 'loading',
        title: '消息更新中...',
        mask: true
        });

      setTimeout(() => {
        let news = this.data.news;
        if(!news.length){
          this.setData({
            hasList: false
          });
        }else{
          this.setData({
            hasList: true
          });
        }
      },1000);
      
    },

   //关闭消息
    deleteList(e) {
      const index = e.currentTarget.dataset.index;
      let news = this.data.news;
      news.splice(index,1);
      this.setData({
        news: news
      });
      if(!news.length){
        this.setData({
          hasList: false
        });
      }
    }, 
    //接受
    accept(e){
      var teamid = e.currentTarget.dataset.teamid
      var that = this
     wx.request({
        url: 'https://autumndreams.club/selcou/teacher/agreeteam',
        data:{
          teamid:teamid,
          teamstatus:"已通过"
        },
        success: function (res) {
          if (res.data.code == 0) {
            wx.showModal({
              title: '已接受该队伍！',
              showCancel:false,
              confirmText:'知道了',
              })
            that.deleteList(e)
          }else{
            wx.showModal({
              title: res.data.message,
              showCancel:false,
              confirmText:'知道了',
              })
          }
        }
      })
    },
    //拒绝
    refuse(e){
      var teamid = e.currentTarget.dataset.teamid
      var that = this
      wx.request({
        url: 'https://autumndreams.club/selcou/teacher/agreeteam',
        data:{
          teamid:teamid,
          teamstatus:"未通过"
        },
        success: function (res) {
          if (res.data.code == 0) {
            wx.showModal({
              title: '已拒绝该队伍！',
              showCancel:false,
              confirmText:'知道了',
              })
            that.deleteList(e)
          }else{
            wx.showModal({
              title: res.data.message,
              showCancel:false,
              confirmText:'知道了',
              })
          }
        }
      })
    },
  }
})
