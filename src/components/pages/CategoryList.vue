<template>
    <div>
        <div class="navbar-div" >
             <van-nav-bar   title="类别列表" fixed/> 
        </div>
        <div class="con-div">
            <van-row>
                <div class="tabCategory">
                        <van-tabs v-model="active" @click="clickCategory" >
                            <van-tab v-for="(item, index) in catelist" :key="index" :title="item.MALL_CATEGORY_NAME"> 
                            </van-tab>
                        </van-tabs>
                    </div>
            </van-row>
            <van-row>
                <van-col span="6">
                    <div id="leftNav">
                        <ul @click="clickSubCategory(index,item.ID)" :class="{categorySubActive:categorySubIndex==index}" v-for="(item,index) in cateSubList" :key="index">
                            <li>{{item.MALL_SUB_NAME}}</li>
                        </ul>
                    </div>
                    
                </van-col>
                <van-col span="18">
                    <div id="list-div">
                          <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                              <van-list v-model="loading" :finished="finished" @load="onLoad">
                                <!-- <van-row gutter="20">
                                    <van-col span="12" v-for="(item,index) in goodsList" :key="index">
                                        <goodsInfoComponent :good="{name:item.name,image:item.IMAGE1,price:item.ORI_PRICE,mallprice:item.PRESENT_PRICE}" class="list-item"></goodsInfoComponent>
                                    </van-col>
                                </van-row> -->
                                <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item,index) in goodsList" :key="index">
                                    <div class="list-item-img"><img :src="item.IMAGE1" width="100%" :onerror="errorImg"/></div>
                                    <div class="list-item-text">
                                        <div>{{item.name}}</div>
                                        <div class="">￥{{item.ORI_PRICE}}</div>
                                    </div>
                                </div>
                              </van-list>
                          </van-pull-refresh>
                    </div>
                    
                </van-col>
            </van-row>
        </div>      
    </div>  
    
</template>
<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import goodsInfoComponent from "@/components/component/goodsInfoComponent";
export default {
  data() {
    return {
      pageno: 1,
      pagesize: 10,
      catelist: [],
      cateSubList: [],
      goodsList: [],
      good: {},
      categoryIndex: 0,
      categorySubIndex: 0,
      active: 0,
      loading: false, //上拉加载使用
      finished: false, //下拉加载是否没有数据了
      isRefresh: false, //下拉加载
      errorImg:'this.src="' + require('@/assets/images/errorimg.png') + '"'   ,  //错误图片显示路径

    };
  },
  created() {
    this.getCategory();
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height = winHeight - 46 -50 + "px";
    document.getElementById("list-div").style.height = winHeight - 90 -50 + "px";
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        if(this.cateSubList.length){
          let subCategoryId = this.cateSubList[this.categorySubIndex].ID
            ? this.cateSubList[this.categorySubIndex].ID
            : this.cateSubList[0].ID;
          this.getGoodsListByCategorySubId(subCategoryId);
        }
      }, 500);
    },
    onRefresh() {
      setTimeout(() => {
        console.log('zcl')
        this.isRefresh = false;
        this.finished=false;
        this.goodsList=[];
        this.pageno=1;
        this.onLoad();
      }, 500);
    },
    goGoodsInfo(id){
      this.$router.push({name:'Goods',params:{goodsId:id}})
    },
    clickCategory(index, title) {
      this.categoryIndex = index;
      this.active = index;
      let categoryId = this.catelist[index].ID;
      this.goodsList = [];
      this.finished = false;
      this.pageno = 1;
      this.getCategorySubByCategoryId(categoryId);
    },
    clickSubCategory(index, subCategoryId) {
      this.categorySubIndex = index;
      this.goodsList = [];
      this.finished = false;
      this.pageno = 1;
      this.onLoad();
      //this.getGoodsListByCategorySubId(subCategoryId);
    },
    getGoodsListByCategorySubId(subCategoryId) {
      axios({
        url: url.getGoodsListByCategorySubId,
        method: "post",
        data: {
          subCategoryId: subCategoryId,
          pageno: this.pageno,
          pagesize: this.pagesize
        }
      })
        .then(response => {
          if (response.data.status == 200 && response.data.message.length) {
            this.pageno++;
            this.goodsList = this.goodsList.concat(response.data.message);
          } else {
            this.finished = true;
            //Toast("服务器错误，数据取得失败");
          }
          console.log(this.finished);
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCategorySubByCategoryId(categoryId) {
      axios({
        url: url.getCategorySubList,
        method: "post",
        data: {
          categoryId: categoryId
        }
      })
        .then(response => {
          if (response.data.status == 200 && response.data.message) {
            this.cateSubList = response.data.message;
            this.getGoodsListByCategorySubId(this.cateSubList[0].ID);
            //this.active = 0;
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCategory() {
      axios({
        url: url.getCategoryList,
        method: "get"
      })
        .then(response => {
          if (response.data.status == 200 && response.data.message) {
            this.catelist = response.data.message;
            this.getCategorySubByCategoryId(this.catelist[0].ID);
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {
    goodsInfoComponent
  }
};
</script>
<style scoped>
.con-div {
  margin-top: 46px;
}
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  border-right: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categorySubActive {
  background-color: #fff;
}
#list-div {
  /* padding: 6px; */
  background-color: #fff;
  overflow: scroll;
}

 .list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}

.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
} 
</style>
