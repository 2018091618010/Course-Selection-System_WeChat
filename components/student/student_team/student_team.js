Component({
  /**
   * 页面的初始数据
   */

  data:{  
    TeamInf:[
      {
        coursename:"微信小程序",
        teacher:"teacher1",
        captain: "刘XX",
        cap_contactway: "4008-823-823",
        members:["张三","李四","王五"],
        id:1
      },
        {
            coursename:"微信小程序",
            teacher:"teacher1",
            captain: "刘XX",
            cap_contactway: "4008-823-823",
            members:[
                "张三",
                "李四",
                "王五"],
            id:2
        },
        {
            coursename:"微信小程序",
            teacher:"teacher1",
            captain: "刘XX",
            cap_contactway: "4008-823-823",
            members:[
                "张三",
                "李四",
                "王五"],
            id:3
        },
        {
            coursename:"微信小程序",
            teacher:"teacher1",
            captain: "刘XX",
            cap_contactway: "4008-823-823",
            members:[
                "张三",
                "李四",
                "王五"],
            id:4
        },
        {
            coursename:"微信小程序",
            teacher:"teacher1",
            captain: "刘XX",
            cap_contactway: "4008-823-823",
            members:[
                "张三",
                "李四",
                "王五"],
            id:5
        }, {
            coursename:"微信小程序",
            teacher:"teacher1",
            captain: "刘XX",
            cap_contactway: "4008-823-823",
            members:[
                "张三",
                "李四",
                "王五"],
            id:6
        }
        ],
        typeId : ""
  },  
  lifetimes: {

    attached: function() {

        wx.request({
            url: '',
            data:{
             
            },
            header:{
              'content-type' : 'json'
            },
            success(res){
              that.setData({
                TeamInf : backInf
              })
            }
    
          })
    },

  },
  methods:{
    
    addteam(){

    },
    
  refresh(){  
  var that = this;
  wx.request({
    url: '',
    data:{
      pageId : this.data.choosenId,
      typeId : this.data.typeId
    },
    success(res){
        that.setData({
          Inf : res.data
        })
    }
  })
 },
  
}

})