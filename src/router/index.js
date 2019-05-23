import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/dashboard',
    component: Layout, 
    hidden: true,
    children: [{
      name: 'Dashboard',
      path: '',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/',
    hidden: true,
    component: Layout,
    redirect: '/map/index'
  }
]

export const asyncRouterMap = [
  {
    path: '/map',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Map',
        component: () => import('@/views/map/index'),
        meta: { title: '地图', icon: 'map' }
      }
    ]
  },


  {
    path: '/table',
    component: Layout,
    redirect: '/table/detail-table',
    name: 'Table',
    meta: {
      title: '表格数据',
      icon: 'example',
      // roles: ['admin']
    },
    children: [
      {
        path: 'detail-table',
        name: 'DetailTable',
        component: () => import('@/views/detail-table/index'),
        meta: { title: '详细数据', icon: 'form' }
      },
      {
        path: 'detect-table',
        name: 'DetectTable',
        component: () => import('@/views/detect-table/index'),
        meta: { title: '检测数据', icon: 'form' }
      }
    ]
  },

  {
    path: '/echart',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Echart',
        component: () => import('@/views/echart/index'),
        meta: { title: '统计信息', icon: 'form' }
      }
    ]
  },
  

  // {
  //   path: '/tree_table',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Tree_table',
  //       component: () => import('@/views/tree_table/index'),
  //       meta: { title: '表格实例', icon: 'form' }
  //     }
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
