import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/books'
    },
    {
      path: '/books',
      name: 'Books',
      component: () => import('@/views/books')
    }
  ]
})
