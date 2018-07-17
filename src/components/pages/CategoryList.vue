<template>
    <div>
        <div class="navbar-div" >
             <van-nav-bar   title="类别列表" fixed/> 
        </div>
        <div class="con-div">
            <van-row>
                <van-col span="6">
                    <div id="leftNav">
                        <ul @click="clickCategory(index)" :class="{categoryActive:categoryIndex==index}" v-for="(key,index) in catelist" :key="index">
                            <li>{{key.MALL_CATEGORY_NAME}}</li>
                        </ul>
                    </div>
                </van-col>
                <van-col span="18">
                    <div id="right">
                    </div>
                </van-col>
            </van-row>
        </div>      
    </div>  
    
</template>
<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
export default {
  data() {
    return {
      catelist: [],
      categoryIndex: 0
    };
  },
  created() {
    this.getCategory();
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height = winHeight - 46 + "px";
  },
  methods: {
    clickCategory(index) {
      this.categoryIndex = index;
    },
    getCategory() {
      axios({
        url: url.getCategoryList,
        method: "get"
      })
        .then(response => {
          if (response.data.status == 200 && response.data.message) {
            this.catelist = response.data.message;
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
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
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive {
  background-color: #fff;
}
#right {
  padding: 6px;
}
</style>
