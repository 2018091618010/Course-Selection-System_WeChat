// components/student/student_inf/stu_news/stu_news.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  data: {
    news:[],               // 消息列表
    hasList:false,          // 列表是否有数据
    totalPrice:0,           // 总价，初始为0
    selectAllStatus:true,    // 全选状态，默认全选
    obj:{
        name:"hello"
    }
  },
 
  
  /**
   * 组件的方法列表
   */
  methods: {
    onShow() {
      this.setData({
        hasList: true,
        news:[
          {id:1,title:'入队请求',detail:'张三想要加入'},
          {id:2,title:'组队请求结果',detail:'拒绝'},
          {id:3,title:'选课请求结果',detail:'老师同意'}
        ]
      });
      this.getTotalPrice();
    },
    /**
     * 当前商品选中事件
     */
    selectList(e) {
      const index = e.currentTarget.dataset.index;
      let news = this.data.news;
      const selected = news[index].selected;
      news[index].selected = !selected;
      this.setData({
        news: news
      });
      this.getTotalPrice();
    },
  
    /**
     * 消息
     */
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
  }
})
