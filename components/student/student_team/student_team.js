Component({
  /**
   * 页面的初始数据
   */

  data:{  
    appli:false,
    id: [],
    teamid: 0,
    indexId: 0,
    text:"",
    istoright: true,
    scrollindex:0,  //当前页面的索引值
    totalnum:3,  //总共页面数
    starty:0,  //开始的位置x
    endy:0, //结束的位置y
    critical: 100, //触发翻页的临界值
    margintop:0,  //滑动下拉距离
    teamlist: [],
  },  
  lifetimes: {
 
    attached: function() {
    var that = this
    wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    winHeight: res.windowHeight
                });
                }
        });
      wx.showToast({
                icon: 'loading',
                title: '初始化页面...',
                mask: true
              });
    wx.request({
        url: "https://autumndreams.club/selcourse/student/ableteam",
        method:'GET',
        success: function (res) {
         that.setData({
            teamlist: res.data.data.subject,
          });
        }
    })  
     /* 根据id搜索
        wx.request({
            url: "http://106.54.98.59/selcourse/student/selectteam?id=1",
            method:'GET',
            success: function (res) {
                if (res.data.message == "success") {
                that.setData({
                    id: res.data.data
                });
                }
            }
          });*/
    },
  },
  /**
   *  跳转搜索页面
   * suo: function (e) {
    wx.navigateTo({
      url: '../search/search',
    })
  },
   *  
   */
  mounted () {
    // this.initList()
    var that = this
    window.addEventListener("scroll", function () {
      // if(document.body.scrollHeight <= window.screen.height + document.body.scrollTop){
      //       if (that.noMore) {
      //           return
      //       }
      //       if (that.initOver) {
      //           that.initList()
      //       }
      //   }

    })
},

  methods:{
    realname:function(e){
      //console.log(e.detail.value);
      var that = this;
      var user = wx.getStorageSync('userdata')
      that.setData({
        text:e.detail.value,
        stuid: user.puId,
     });
    },
  
  //提交组队申请//
  realnameConfirm: function(e) {
    var that = this;
     wx.request({
      url: "https://autumndreams.club/selcourse/Select/jointeam",
      method:'POST',
      data:{
          stuid:(this.data.stuid),
          teamid:(this.data.teamlist[this.data.scrollindex].teamlist.teamid),
          text: this.data.text,       
      },
      header: {"Content-Type":"application/x-www-form-urlencoded"},
      success: function (res) {
        console.log(res);
        if(res.data.message == "success"){ 
          wx.showToast({
            title: '申请成功',
            image: '/img/loginsuccess.png',
            duration: 2000
          })
        that.setData({
          appli:false
        });
      }else{
        wx.showModal({
          title: '申请失败',
          showCancel:false,
          confirmText:'知道了',
          confirmColor: 'red'
          })
      }
    }
  })  
  },
  creatteam:function(){
    wx.navigateTo({
    url: '/components/student/student_team/teamCreate/teamCreate',
  })
  },

  join:function(){
    this.data.appli==true?this.setData({ appli: false}): this.setData({appli: true})
    // this.data.appli=true
  },
    //界面动态效果
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
        // this.data.rightNowDate=this.data.teamlist[index]
        var that = this;
      
        let d = this.data;
        if(d.endy-d.starty >100 && d.scrollindex>0){
          this.setData({
            scrollindex: d.scrollindex-1
          })
        }else if(d.endy-d.starty <-100 && d.scrollindex<this.data.teamlist.length-1){
          this.setData({
            scrollindex: d.scrollindex+1
          })
        }
        this.setData({
            starty:0,
            endy:0,
            margintop:0
        })
        that.setData({
          teamid: this.data.teamlist[this.data.scrollindex].teamid
        })
      },
},



})