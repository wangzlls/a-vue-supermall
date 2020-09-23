import Vue from 'vue'
import VueRouter from 'vue-router'

//使用此种方式是懒加载，当路由访问到指定组件的时候才会加载该页面
const Home = () => import('../views/home/Home');
const Category = () => import('../views/category/Category');
const Cart = () => import('../views/cart/Cart');
const Profile = () => import('../views/profile/Profile');
const Detail = () => import('../views/detail/Detail');

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    //设置重定向，相当于默认跳转页面
    redirect:'/home'
  },
  {
    path: '/home',
    component:Home
  },
  {
    path: '/category',
    component:Category
  },
  {
    path: '/cart',
    component:Cart
  },
  {
    path: '/profile',
    component:Profile
  },
  {
    //这种方法类似于讲参数设置在params中，在Detail中可以直接使用this.$route.params.iid拿到数据
    path: '/detail/:iid',
    component:Detail
  }
]
const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
