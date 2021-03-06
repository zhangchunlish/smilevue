const BASEURL = "https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue/"
const LOCALURL = "http://localhost:3000/"

const URL ={
    getShopingMallInfo : BASEURL+'index',    //商城首页所有信息
    getGoodsInfo : BASEURL+'getGoodsInfo',
    registerUser:LOCALURL+'user/register',   //用户注册接口
    loginUser:LOCALURL+'user/login',//用户登录接口
    getDetailGoodsInfo:LOCALURL+'goods/getDetailGoodsInfo',   //商品详情接口
    getCategoryList:LOCALURL+'goods/getCategoryList',         //得到大类信息
    getCategorySubList:LOCALURL+'goods/getCategorySubList',   //得到小类信息
    getGoodsListByCategorySubId:LOCALURL+'goods/getGoodsListByCategorySubId',   //根据商品类别获取商品


}

module.exports = URL
