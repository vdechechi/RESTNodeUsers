import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import UsersView from '@/views/UsersView.vue'
import EditView from '@/views/EditView.vue'
import axios from 'axios'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/register',
    name: '/register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },

  {

    path: '/admin/users/edit/:id',
    name: 'userEdit',
    component: EditView,
    beforeEnter: (to, from, next) => {

      if (localStorage.getItem('token') != undefined) {


        var req = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
          }
        }

        console.log(req)

        axios.post("http://localhost:3000/validate", {}, req).then(res => {

          console.log(res)
          next()


        }).catch(err => {
          console.log(err.response)
          next("/login")

        })
      } else {
        next('/login')

      }
    }

  },

  {
    path: '/admin/users',
    name: 'users',
    component: UsersView,
    beforeEnter: (to, from, next) => {

      if (localStorage.getItem('token') != undefined) {


        var req = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
          }
        }

        console.log(req)

        axios.post("http://localhost:3000/validate", {}, req).then(res => {

          console.log(res)
          next()


        }).catch(err => {
          console.log(err.response)
          next("/login")

        })
      } else {
        next('/login')

      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
