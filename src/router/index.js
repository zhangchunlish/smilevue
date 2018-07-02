import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Count from '@/components/vuex/count'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShoppingMall',
      component: ShoppingMall
    },{
      path: '/register',
      name: 'Register',
      component: Register
    },{
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/Goods',
      name: 'Goods',
      component: Goods
    },{
      path: '/vuex',
      name: 'Count',
      component: Count
    }
  ]
})
