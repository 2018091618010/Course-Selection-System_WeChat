// components/student/student_inf/stu_news/stu_news.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  data: {
    // 判断
    flag:[],
    selectFlag:'-999',
    a1:0,
    select:false,
    courlist:[
    ],
    teamlist:[
    ]
  },
  lifetimes: {

    attached: function() {
    //获取当前老师的课程信息
    var that = this
    var user = wx.getStorageSync('userdata')
    wx.request({
        url: "https://autumndreams.club/selcou/teacher/showcourse",
        method:'GET',
        data:{
            teaid:user.puId
        },
        success: function (res) {
         //  console.log(res.data)
         that.setData({
            courlist: res.data.data.coulist,
          });
          for (let index = 0; index < that.data.courlist.length; index++) {
            that.data.flag[index] = 0 ;
          }
        }
    })
  },
},
  /**
   * 组件的方法列表
   */
  methods: {

// *点击下拉*
  bindShowList(e){
    var idx = e.currentTarget.dataset.idx;
    let arr = [];
    arr = this.data.flag
    if(this.data.flag[idx]==1){
      arr[idx]=0;
      this.setData({
        flag:arr
      })
      return
    }else if(this.data.flag[idx]==0){
      arr[idx]=1;
      for (let index = 0; index < this.data.flag.length ; index++) {
        if (index != idx) {
          arr[index]=0;
        }
      } 
      this.setData({
        flag:arr
      })
    }
    var that = this;
      //根据课程id 查看课程学生信息
      wx.request({
        url: "https://autumndreams.club/selcou/teacher/showcoustu",
        method:'GET',
        data:{
          couid:this.data.courlist[idx].couid
        },
        success: function (res) {
            if (res.data.code == 0) {
            that.setData({
              teamlist: res.data.data.teamlist
            });
            }
        }
      })
  },
  //结束选课
  cancelclass(e) {
    var idx = e.currentTarget.dataset.idx;
    var that = this;
    wx.showModal({
      title: '结束选课',
      content: '确定要结束该课程选课？',
      showCancel: true,//是否显示取消按钮
      cancelColor:'green',//取消文字的颜色
      confirmColor: 'red',//确定文字的颜色
      success: function (res) {
         if (res.cancel) {
            //点击取消,默认隐藏弹框
         } else {
            //点击确定 
              wx.request({
                url: "https://autumndreams.club/selcou/teacher/showcoustu",
                method:'GET',
                data:{
                  couid:that.data.courlist[idx].couid
                },
                success: function (res) {
                    if (res.data.code == 0) {
                      wx.showModal({
                        title: '已结束该课程选课',
                        showCancel:false,
                        confirmText:'知道了'
                        })
                    }
                }
              })
         }
      },
      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
   })

     
  }
  }
})
