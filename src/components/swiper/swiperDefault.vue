<template>
    <div>
        <swiper :options="swiperOption" class="swiper">
            <swiper-slide class="swiper-slide"  v-for="(item,index) in slides" :key="index">
              Slide {{item}}
            </swiper-slide>
        </swiper>
        <div class="swiper-pagination" slot="pagination"></div>

    </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        loop:true,//无线循环滚动
        pagination: {
          el: ".swiper-pagination",
          clickable:true

        }
        
      },
      slides: [1, 2, 3, 4, 5, 6, 7]
    };
  },
  components: { swiper, swiperSlide }
};
</script>
<style scoped>
.swiper{
    height: 7rem;
      border-top:1px solid #ccc;
      border-bottom:1px solid #ccc;
}
.swiper-slide {
  height: 4rem;
  text-align: center;
  padding-top: 3rem;
  border-bottom: 1px solid #ccc;
}
</style>


