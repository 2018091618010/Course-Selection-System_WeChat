Component({
  /**
   * 页面的初始数据
   */

  data:{  
    open : false ,
    lists: [
      "teacher1", "teacher2", "teacher3", "teacher4", "teacher5", "teacher6", "teacher7", "teacher8", "teacher9", "teacher10", "teacher11", "teacher12"
      ],
      indexId: 0,
      mark: 0, // mark 是指原点x轴坐标
      newmark: 0,// newmark 是指移动的最新点的x轴坐标 
      istoright: true
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
    },

  },
  methods:{
    

  jumpIndex(e) {
    let index = e.currentTarget.dataset.menuindex
    let that = this
    that.setData({
    indexId: index
    });
  },

  // 点击左上角小图标事件
  tap_ch: function(e) {
      if (this.data.open) {
          this.setData({
              open: false
          });
      } else {
          this.setData({
              open: true
          });
      }
  },

  tap_start: function(e) {
      // touchstart事件
      // 把手指触摸屏幕的那一个点的 x 轴坐标赋值给 mark 和 newmark
      this.data.mark = this.data.newmark = e.touches[0].pageX;
  },

  tap_drag: function(e) {
      // touchmove事件
      this.data.newmark = e.touches[0].pageX;
     
      // 手指从左向右移动
      if (this.data.mark < this.data.newmark) {
          this.istoright = true;
      }
      
      // 手指从右向左移动
      if (this.data.mark > this.data.newmark) {
          this.istoright = false;
      }
      this.data.mark = this.data.newmark;
  },

  tap_end: function(e) {
      // touchend事件
      this.data.mark = 0;
      this.data.newmark = 0;
      // 通过改变 opne 的值，让主页加上滑动的样式
      if (this.istoright) {
          this.setData({
              open: true
          });
      } else {
          this.setData({
              open: false
          });
      }
  },
 
}
})