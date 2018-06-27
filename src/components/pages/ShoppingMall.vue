<template>
    <div>
         <div class="search-bar">
            <van-row>
                <van-col span="3">
                    <img :src="locationIcon" width="80%" class="location-icon"/>
                </van-col>
                <van-col span="16">
                    <input type="text" class="search-input" />
                </van-col>
                <van-col span="5">
                    <van-button size="mini">查找</van-button>
                </van-col>
            </van-row>
        </div>
        <!--swiper area-->
        <div class="swiper-area">
            <van-swipe :autoplay="1000">
                <van-swipe-item v-for="( banner ,index) in bannerPicArray" :key="index" >
                    <img v-lazy="banner.image" width="100%"/>
                </van-swipe-item>
            </van-swipe>
        </div>  
        <!--type bar-->
        <div class="type-bar">
            <div v-for="(cate,index) in category" :key="index">
                <img v-lazy="cate.image" width="90%">
                <span>{{cate.mallCategoryName}}</span>

            </div>
        </div>  
        <!--adbanner area-->
        <div>
            <img v-lazy="adBanner" width="100%" />
        </div>
        <div class="recommend-area">
            <div class="recommend-title">商品推荐</div>
            <div class="recommend-body">
                <!--swiper-->
                <swiper :options="swiperOption">
                    <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
                        <div class="recommend-item">
                            
                                <img :src="item.image" width="80%" />
                                <div>{{item.goodsName}}</div>
                                <div>￥{{item.price}} (￥{{item.mallPrice}})</div>
                                
                        </div>
                    </swiper-slide>
                </swiper>
 
            </div>
        </div>
            <!-- 
            <div><swiperDefault></swiperDefault></div>
            <div><swiperDefault2></swiperDefault2></div> 
            -->
            <floorComponent :floorData="floor1" :floorName="floorName.floor1"></floorComponent>
            <floorComponent :floorData="floor2" :floorName="floorName.floor2"></floorComponent>
            <floorComponent :floorData="floor3" :floorName="floorName.floor3"></floorComponent>
            <!--Hot Area-->
            <div class="hot-area">
              <div class="hot-title">热卖商品</div>
              <div class="hot-goods">
                  <!--这里需要一个list组件-->
                      <van-list>
                        <van-row gutter="20">
                            <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                                <goodsInfoComponent :good="item"></goodsInfoComponent>
                            </van-col>
                        </van-row>
                      </van-list>
              </div>
          </div>   
</div>
</template>
<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import swiperDefault from "../swiper/swiperDefault";
import swiperDefault2 from "../swiper/swiperDefault2";
import floorComponent from "@/components/component/floorComponent";
import goodsInfoComponent from "@/components/component/goodsInfoComponent";
export default {
  created() {
    axios({
      url: url.getShopingMallInfo,
      method: "get"
    })
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          this.category = response.data.data.category;
          this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
          this.bannerPicArray = response.data.data.slides;
          this.recommendGoods = response.data.data.recommend;
          this.floor1 = response.data.data.floor1;
          this.floor2 = response.data.data.floor2;
          this.floor3 = response.data.data.floor3;
          this.floorName = response.data.data.floorName;
          this.hotGoods = response.data.data.hotGoods;
          console.log(this.hotGoods);
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3
      },
      locationIcon: require("../../assets/images/定位.png"),
      bannerPicArray: [],
      category: [],
      adBanner: "",
      recommendGoods: [], //推荐商品
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: [] //热卖商品
    };
  },
  components: {
    swiper,
    swiperSlide,
    swiperDefault,
    swiperDefault2,
    floorComponent,
    goodsInfoComponent
  }
};
</script>
<style scoped>
.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid #fff !important;
  background-color: #e5017d;
  color: #fff;
}
.location-icon {
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}
.swiper-area {
  clear: both;
  max-height: 15rem;
  overflow: hidden;
}

.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: baseline;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
}
.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}

.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
/* .hot-title {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
  background-color: #f0f0f0;
} */
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
} 
</style>


