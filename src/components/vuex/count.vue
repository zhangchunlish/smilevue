<template>
    <div>
        <h2>{{msg}}</h2>
        <hr/>
        <h3>{{$store.state.count}}</h3>
        <h3>{{count}}</h3>
        <!-- <h3>{{$store.state.a.count}}</h3> -->
        <h4>在count.vue模板中加入两个按钮，并调用mutations中的方法</h4>
        <p>
            <button @click="$store.commit('add',10)">+</button>
            <button @click="$store.commit('reduce')">-</button>
        </p>
        <h4>在模板count.vue里用import引入我们的mapMutations,同步改变state状态</h4>
        <p>
            <button @click="add(10)">+</button>
            <button @click="reduce">-</button>
        </p>
        <h4>在模板count.vue里用import引入我们的mapActions,异步的改变state状态</h4>
        <p>
            <button @click="addAction">+</button>
            <button @click="reduceAction">-</button>
        </p>
    </div>
</template>
<script>
import store from "@/vuex/store";
import { mapState, mapMutations, mapGetters,mapActions } from "vuex";
export default {
  data() {
    return {
      msg: "Hello Vuex"
    };
  },
  //把store.js中的state值赋值给我们模板中的data值
  // computed:{
  //   count(){
  //      return this.$store.state.count;
  //   }
  // }
  // computed: mapState({
  //    count: state => state.count
  // })
  computed: {
    ...mapState(["count"]),
    ...mapGetters(["count"])//getters计算过滤操作
  },
  methods: {
    ...mapMutations(["add", "reduce"]),
    ...mapActions(["addAction", "reduceAction"])
  },
  store
};
</script>
<style scoped>
</style>


