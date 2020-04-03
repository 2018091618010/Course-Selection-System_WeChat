// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    puId: "",
    password: "",
    character:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  choose: function (e) {
    this.setData({
      character: e.detail.value
    });
  },
  inputa: function (e) {
    this.setData({
      puId: e.detail.value
    });
  },
  inputb: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  login: function (e) {
    console.log(this.data.puId)
    console.log(this.data.password)
    var that = this;
    wx.request({
      url: 'xxx',
      data: {
        character:this.data.character,
        id: this.data.puId,
        pass: this.data.password
      },
      method: "POST",
      success: function (res) {
        if (res.data == "success") {
          console.log(that.data.puId);
          if (this.data.character=="teacher"){
              wx.navigateTo({
                url: '../teacher/teacher',
          })
          }
          else {
            wx.navigateTo({
              url: '../student/student',
            })
          }
        }
        else {
          wx.showToast({
            title: '账号密码输入有误',
            image: '../img/fail.png'
          })
        }
      }
    })

  },
})