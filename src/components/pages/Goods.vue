<template>
    <div>
        商品详情页面
    </div>
</template>
<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
export default {
  data() {
    return {
      goodsId: '',
      goodsInfo: {}
    };
  },
  created(){
       this.goodsId= this.$route.query.goodsId
       console.log(this.goodsId)
       this.getInfo()
  },
  methods: {
    getInfo() {
      axios({
            url: url.getDetailGoodsInfo,
            method: "post",
            data: {
                goodsId: this.goodsId
            }
        }).then(response => {
          console.log(response)
        //   if (response.status == 200) {
        //     this.goodsInfo = response.message;
        //   }
        })
        .catch(error => {
            console.log(error);
        })
    },
  }
};
</script>
<style scoped>
</style>

