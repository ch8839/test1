import Vue from 'vue'
import Router from 'vue-router'

import Layout from '../pages/layout/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login/login')
    },
    {
      path: '/',
      component: Layout,
      redirect: '/index',
      name: 'Index',
      hidden: true,
      children: [{
        path: 'index',
        component: () => import('@/pages/index/index')
    }]
    },
    
    {
      path: '/example',
      component: Layout,
      redirect: '/example/table',
      name: 'Example',
      hidden: true,
      children: [
        {
          path: 'table',
          component: () => import('@/pages/table/index')
        },
        {
          path: 'grid',
          component: () => import('@/pages/grid/index')
        },
        {
          path: 'flex2',
          component: () => import('@/pages/flex2/index')
        },
        {
          path: 'flex3',
          component: () => import('@/pages/flex3/index')
        },
        {
          path: 'form',
          component: () => import('@/pages/form/index')
        },
        {
          path: 'ui',
          component: () => import('@/pages/ui/index')
        },
        {
          path: 'menu',
          component: () => import('@/pages/menu/index'),
          children: [
            {
              path: 'menu1-1',
              component: () => import('@/pages/menu/menu1/index'),
              name: 'Menu1-1'
            },
          ]
        },
      ]
    },
    {
      path: '/page1',
      component: Layout,
      hidden: true,     
      children: [{        
        path: 'index',
        redirect: 'index/table',
        component: () => import('@/pages/page1/index'),
        children: [
          { 
            name:'Mytable',       
            path: 'table',
            component: () => import('@/pages/table/index')
          },
          { 
            name:'grid',    
            path: 'grid',
            component: () => import('@/pages/grid/index')
          },
          { 
            name:'form',    
            path: 'form',
            component: () => import('@/pages/form/index')
          },
        ]
      }]
    },
    {
      path: '/page2',
      component: Layout,
      hidden: true,
      children: [{
        path: 'index',
        name: 'page2',
        component: () => import('@/pages/page2/index')
    }]
    },
    {
      path: '/page3',
      component: Layout,
      hidden: true,
      children: [{
        path: 'index',
        name: 'page3',
        component: () => import('@/pages/page3/index')
    }]
    },
    {
      path: '/page-test',
      component: Layout,
      hidden: true,
      children: [{
        path: 'index',
        name: 'Page-Test',
        component: () => import('@/pages/page-test/index')
    }]
    },
   
  ]
})
