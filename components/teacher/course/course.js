Component({
  /**
   * 页面的初始数据
   */

  data:{  
    open : false ,
    tealist: [],
    indexId: 0,
    mark: 0, // mark 是指原点x轴坐标
    newmark: 0,// newmark 是指移动的最新点的x轴坐标 
    istoright: true,
    curteacher:"welcome to select courses",
    scrollindex:0,  //当前页面的索引值
    totalnum:3,  //总共页面数
    starty:0,  //开始的位置x
    endy:0, //结束的位置y
    critical: 100, //触发翻页的临界值
    margintop:0,  //滑动下拉距离
    coulist: []
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
            url: "https://autumndreams.club/selcou/teacher/showname",
            method:'GET',
            success: function (res) {
                if (res.data.message == "success") {
                that.setData({
                    tealist: res.data.data
                });
                }
            }
          });
    },

  },
  methods:{
    
  jumpIndex(e) {
    let index = e.currentTarget.dataset.menuindex
    let curteacher =  e.currentTarget.dataset.teacher
    var user = wx.getStorageSync('userdata')
    let that = this
    that.setData({
        indexId: index,
        curteacher:curteacher     
    });
    wx.request({
        url: "https://autumndreams.club/selcou/teacher/showcourse",
        method:'GET',
        data:{
            teaid:index
        },
        success: function (res) {
         that.setData({
            coulist: res.data.data.coulist,
          });
        }
    })  
  },

  // 点击左上角小图标事件
  tap_ch: function(e) {
      if (this.data.open) {
          this.setData({
              open: false
          });
      } else {
          this.setData({
              open: true,
              scrollindex:0
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
      if (this.data.newmark - this.data.mark > 12) {
          this.istoright = true;
          this.setData({
            scrollindex:0
          })
      }
      
      // 手指从右向左移动
      if (this.data.mark - this.data.newmark > 12) {
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
        let d = this.data;
        if(d.endy-d.starty >100 && d.scrollindex>0){
          this.setData({
            scrollindex: d.scrollindex-1
          })
        }else if(d.endy-d.starty <-100 && d.scrollindex<this.data.coulist.length-1){
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