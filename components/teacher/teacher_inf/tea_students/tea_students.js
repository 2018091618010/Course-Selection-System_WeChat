// components/student/student_inf/stu_news/stu_news.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  data: {
    // 判断
    flag:[0,0,0,0],
    selectFlag:'-999',
    a1:0,
    select:false,
    courseList:[{
      coursename:"微信小程序开发与实战",
      teamlist:[
       {
        teamname:"一带一路",
        teamleader:"ttt",
       },{
        teamname:"一带一路",
        teamleader:"ttt",
       },{
        teamname:"一带一路",
        teamleader:"ttt",
       },{
        teamname:"一带一路",
        teamleader:"ttt",
       }
      ]
    },{
      coursename:"c++实现底层",
      teamlist:[
       {
        teamname:"一带一路",
        teamleader:"ttt",
       },{
        teamname:"一带一路",
        teamleader:"ttt",
       }
      ]
    },{
      coursename:"web开发",
      teamlist:[
       {
        teamname:"一带一路",
        teamleader:"ttt",
       },{
        teamname:"一带一路",
        teamleader:"ttt",
       },{
        teamname:"一带一路",
        teamleader:"ttt",
       }
      ]
    }],
  },

  
  /**
   * 组件的方法列表
   */
  methods: {
// *点击下拉*
  bindShowList(e){
    console.log("get it",e);
    var idx = e.currentTarget.dataset.idx;
    let arr = [];
    arr=this.data.flag
    console.log("this list ",arr);
    if(this.data.flag[idx]==1){
      arr[idx]=0;
      console.log("this list ",arr);
      this.setData({
        flag:arr
      })
      return
    }else if(this.data.flag[idx]==0){
      arr[idx]=1;
      console.log("this list ",arr);
      
      this.setData({
        // a1 : 180,
        flag:arr
        // [item]:1
      })
    }
  },
  }
})
