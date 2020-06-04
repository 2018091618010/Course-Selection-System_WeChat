// pages/aboutUs/aboutUs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  openLocation:function(){
    wx.openLocation({
        latitude: app.globalData.latitude,
        longitude: app.globalData.longitude,
        scale: 15,
        name:"电子科技大学"
    })
}
})