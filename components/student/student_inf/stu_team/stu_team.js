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
      totalnum:3,  //总共页面数
      starty:0,  //开始的位置x
      endy:0, //结束的位置y
      critical: 100, //触发翻页的临界值
      margintop:0,  //滑动下拉距离
      coulist: [
        {
        courseid: "2020051610001",
        teaid: "2019001",
        coursename: "C++",
        teamnumber: 7,
        coursestatus: "课程未满",
        courseinfo: "描述xxx"
        },
        {
        courseid: "2020051610001",
        teaid: "2019001",
        coursename: "java",
        teamnumber: 7,
        coursestatus: "课程未满",
        courseinfo: "描述xxx"
        },
        {
        courseid: "2020051610001",
        teaid: "2019001",
        coursename: "java",
        teamnumber: 7,
        coursestatus: "课程未满",
        courseinfo: "描述xxx"
        }
      ]
    },
    
  /**
   * 组件的方法列表
   */
  methods: {
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
    },
  }  
})
