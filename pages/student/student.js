// pages/student/student.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      nowIndex:0,
      color: "#000000",
      selectedColor: "#1E90FF",
      tabBar: [
        {
          "iconPath": "/img/course-stu.png",
          "selectedIconPath": "/img/course2.png",
          "text": "课程"
        },
        {
          "iconPath": "/img/team.png",
          "selectedIconPath": "/img/team2.png",
          "text": "队伍"
        },
        {
          "iconPath": "/img/student.png",
          "selectedIconPath": "/img/student2.png",
          "text": "我的"
        }
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  switchTab(e) {
    const data = e.currentTarget.dataset
    this.setData({
      nowIndex: data.index
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})