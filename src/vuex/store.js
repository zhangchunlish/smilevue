import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)

const state={
    count:1
}
const mutations={
    add(state,n){
       state.count+=n;
    },
    reduce(state){
       state.count--;
    }
}
const getters = {
    count:function(state){
        return state.count +=100;
    }
}
//异步修改
const actions ={
    addAction(context){
        context.commit('add',10)
    },
    reduceAction({commit}){
        commit('reduce')
    }
}
//模块组
const moduleA={
    state,mutations,getters,actions
}
export default new vuex.Store({
  state, mutations,getters,actions,
  //modules:{a:moduleA}
})