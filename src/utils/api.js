export default {
  right: '/topic/5433d5e4e737cbe96dcef312', // 正确路径
  error: '/topc/5433d5e4e737cbe96dcef312', // url错误
  backEnd: '/topic/5433d5e4e737cbe96dcef31', // 参数错误
  allBook: '/ebook/book/login/selectHotBook.do', //热门书籍
  banner:'/ebook/book/login/findBanner.do',//获取首页banner
  allkindsBook:'/ebook/book/login/selectBookClass.do',//获取全部分类书籍
  login:'/ebook/manager/unLogin/weblogin.do',//授权登录
 hotValue:'/ebook/book/login/updateHotValue.do',  //增加图书热值(POST)
  culture:'/ebook/book/login/selectBookClass.do',//获取校园纪念品
  collectBook:'/ebook/book/login/addCollection.do',//收藏
  removeCollectBook:'/ebook/book/login/removeCollection.do',//取消收藏
  searchBook:'/ebook/book/login/searchBook.do',//搜索书籍
  addShoppingCart:'/ebook/book/login/addShoppingCart.do',//加入购物车
  findShoppingCart:'/ebook/book/login/findShoppingCart.do',//我的购物车
  myCollecte:'/ebook/book/login/findCollection.do',//我的收藏
  myCollege:'/ebook/book/unlogin/findCollege.do',//我的大学
  myFlat:'/ebook/book/unlogin/findFlat.do',//我的宿舍
  addAddress:'/ebook/book/login/addAddress.do',//新增地址
  myAddress:'/ebook/book/login/findAddress.do',//我的地址列表
  deleteAddress:'/ebook/book/login/removeAddress.do',//删除地址
 modifydefAddress:'/ebook/book/login/modifyDefaultAddress.do',//修改地址
 delGoods:'/ebook/book/login/removeShoppingCart.do',//从购物车删除商品
   schoolCulture:'/ebook/book/login/selectSouvenir.do',//校园文创
  donateBook:'/ebook/book/login/addDonation.do',//捐赠图书
  submitOrder:'/ebook/book/login/submitOrder.do',//提交订单
  myDonation:'/ebook/book/login/findMyDonation.do',//我的捐赠
  myOrders:'/ebook/book/login/findMyOrders.do',//我的订单
   prePay:'/ebook/book/login/prePay.do',//预支付
  getUserInfo:'/ebook/manager/findUserInfo.do',//获取用户信息
  senVtfCode:'/ebook/book/login/sendSmsCaptcha.do',
  findSign:'/ebook/book/login/findSign.do',//

  addDiary:'/ebook/book/login/addDiary.do', //(POST)添加日记title  必传，  content   , icon
  selectDiary:'/ebook/book/login/selectDiary.do', //(GET)查看全部可见日记 page, rows
  selectMyDiary:'/ebook/book/login/selectMyDiary.do', //(GET)查看我的日记 page, rows
  findDiaryDetail:'/ebook/book/login/findDiaryDetail.do', //获取日记详情
  addComment:'/ebook/book/login/addComment.do', //(POST)添加日记评论 content  + diaryId
  addLike:'/ebook/book/login/addLike.do', //(POST)日记点赞 diaryId
  removeLike:'/ebook/book/login/removeLike.do',  // (POST)日记取消赞 diaryId
  findDiaryComments:'/ebook/book/login/findDiaryComments.do',//(GET)获取日记评论列表 diaryid, page, rows
  uploadImg: '/ebook/book/login/uploadImg.do',
  findBookByIsbn: 'ebook/book/login/scanCode.do',//扫描二维码后查找书籍
  computePrice: 'ebook/book/login/computePrice.do',
  bindMobile: 'ebook/book/login/bindMobile.do',//绑定手机号
  findCollege: 'ebook/book/login/findCollege.do',
  selectMajorBook: 'ebook/book/login/selectMajorBook.do',//精确查找
  delDiary: '/ebook/book/login/delDiary.do',//删除日记 
  modifyUserInfo: '/ebook/manager/login/modifyUserInfo.do'

}
