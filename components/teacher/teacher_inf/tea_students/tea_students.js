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
        url: "http://www.justinstar.top/selcou/teacher/showcourse",
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
      console.log(arr);
      this.setData({
        flag:arr
      })
    }
    var that = this;
      //根据课程id 查看课程学生信息
      wx.request({
        url: "http://www.justinstar.top/selcou/teacher/showcoustu",
        method:'GET',
        data:{
          couid:this.data.courlist[idx].courseid
        },
        success: function (res) {
            if (res.data.message == "success") {
            that.setData({
              teamlist: res.data.data.teamlist
            });
            }
        }
      })
  },
  }
})
