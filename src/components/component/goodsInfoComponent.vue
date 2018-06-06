<template>
    <div class="goods-info">
        <div class="goods-image"><img v-lazy="good.image" width="90%"/></div>
        <div class="goods-name">{{good.name}}</div>
        <div class="goods-price">¥{{good.price|moneyFilter}}({{good.mallprice|moneyFilter}})</div>
    </div>

</template>
<script>
import { toMoney } from "@/filter/moneyFilter.js";
export default {
  props: ["good"],
  data() {
    return {};
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  }
};
</script>
<style scoped>
.goods-name {
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size:14px;
  height:1.5rem;
  line-height:1.5rem;
}
.goods-price {
  font-size: 13px;
  text-align: center;
  height:1rem;
  line-height:1rem;
}
</style>


