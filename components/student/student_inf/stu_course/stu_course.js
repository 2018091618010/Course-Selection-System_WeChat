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
        coursename:"微信小程序",
        teacher:"teacher1",
        captain: "刘XX",
        cap_contactway: "4008-823-823",
        members:["张三","李四","王五"],
        id:1
    },
    
  /**
   * 组件的方法列表
   */
  methods: {
    getval(e){
          // console.log(e.detail.value)
          this.setData({ val: e.detail.value})   
      },
      
      add(){      
          var data1 = this.data.inflist;    
          data1.push(this.data.val)      
          this.setData({list:data1,val:''})      
      },
      
      del(e){      
          console.log(e.target.dataset.index)   
   
          var i = e.target.dataset.index;      
          var data2 = this.data.inflist;      
          data2.splice(i,1)     
          this.setData({list:data2})      
      },
  }  
})
