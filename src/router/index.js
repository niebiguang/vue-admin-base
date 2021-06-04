import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
// export const constantRoutes = [
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  


  // {
  //   path: '/negotiation',
  //   component: Layout,
  //   redirect: '/negotiation/allOrder',
  //   name: 'negotiation',
  //   meta: {
  //     title: '协商还款单',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'allOrder',
  //       component: () => import('@/views/negotiation/allNegotiationOrder'), // Parent router-view
  //       name: 'allOrder',
  //       meta: { title: '全部订单' }
  //     },
  //     {
  //       path: 'myOrder',
  //       component: () => import('@/views/negotiation/myNegotiationOrder'),
  //       name: 'myOrder',
  //       meta: { title: '我的协商还款单' }
  //     }
  //   ]
  // },

  // {
  //   path: '/law',
  //   component: Layout,
  //   redirect: '/law/allConsult',
  //   name: 'law',
  //   meta: {
  //     title: '法律咨询单',
  //     icon: 'el-icon-s-operation'
  //   },
  //   children: [
  //     {
  //       path: 'allConsult',
  //       component: () => import('@/views/law/allConsult'), // Parent router-view
  //       name: 'allConsult',
  //       meta: { title: '全部咨询单' }
  //     },
  //     {
  //       path: 'myConsult',
  //       component: () => import('@/views/law/myConsult'),
  //       name: 'myConsult',
  //       meta: { title: '我的咨询单' }
  //     }
  //   ]
  // },

  // {
  //   path: '/pay',
  //   component: Layout,
  //   redirect: '/pay/repayment',
  //   name: 'pay',
  //   meta: {
  //     title: '用户还款流水',
  //     icon: 'el-icon-s-operation'
  //   },
  //   children: [
  //     {
  //       path: 'repayment',
  //       component: () => import('@/views/repayment/repaymentFlow'), // Parent router-view
  //       name: 'repayment',
  //       meta: { title: '用户还款流水' }
  //     },
  //   ]
  // },

  // {
  //   path: '/statistics',
  //   component: Layout,
  //   redirect: '/statistics/channel',
  //   name: 'statistics',
  //   meta: {
  //     title: '数据统计',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'channel',
  //       component: () => import('@/views/statistics/channel'), // Parent router-view
  //       name: 'channel',
  //       meta: { title: '渠道每日新增' }
  //     },
  //     {
  //       path: 'consultation',
  //       component: () => import('@/views/statistics/consultation'),
  //       name: 'consultation',
  //       meta: { title: '协商统计' }
  //     },
  //     {
  //       path: 'debtInquiry',
  //       component: () => import('@/views/statistics/debtInquiry'),
  //       name: 'debtInquiry',
  //       meta: { title: '债务查询统计' }
  //     }
  //   ]
  // },

  // {
  //   path: '/customs',
  //   component: Layout,
  //   redirect: '/customs/detail',
  //   name: 'customs',
  //   meta: {
  //     title: '客户信息查询',
  //     icon: 'el-icon-s-operation'
  //   },
  //   children: [
  //     {
  //       path: 'detail',
  //       component: () => import('@/views/userDetail/userDetails'), // Parent router-view
  //       name: 'detail',
  //       meta: { title: '客户信息查询' }
  //     },
  //   ]
  // },

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' },
       menu:'index',
    }]
  },
  // {
  //   path: '/groupBooking',
  //   component: Layout,
  //   redirect: '/groupBooking/groupBooking-list',
  //   name: 'groupBooking',
  //   meta: {
  //     title: '拼团管理',
  //     icon: 'el-icon-s-grid'
  //   },
  //   // menu:'user_client',
  //   children: [
  //     {
  //       path: 'groupBooking-list',
  //       component: () => import('@/views/groupBooking/index'), // Parent router-view
  //       name: 'groupBooking-list',
  //       meta: { title: '拼团管理'},
  //       menu:'group_buy'
  //     },
  //     {
  //       path: 'groupBooking-edit',
  //       component: () => import('@/views/groupBooking/edit'), // Parent router-view
  //       name: 'groupBooking-edit',
  //       meta: { title: '拼团管理'},
  //       // menu:'groupBooking-edit',
  //       hidden: true
  //     },
  //   ]
  // },

  // {
  //   path: '/product',
  //   component: Layout,
  //   redirect: '/product/loan_product',
  //   name: 'product',
  //   meta: {
  //     title: '贷款产品配置',
  //     icon: 'el-icon-s-operation'
  //   },
  //   // menu:'user_client',
  //   children: [
  //     {
  //       path: 'loan_product',
  //       component: () => import('@/views/product/loanProduct'), // Parent router-view
  //       name: 'loan_product',
  //       meta: { title: '贷款产品配置'},
  //       menu:'loan_product'
  //     },
  //   ]
  // },

  // {
  //   path: '/system',
  //   component: Layout,
  //   redirect: '/system/user_sys',
  //   name: 'system',
  //   meta: {
  //     title: '系统设置',
  //     icon: 'el-icon-s-tools'
  //   },
  //   // menu:'sys_mng',
  //   children: [
  //     {
  //       path: 'user',
  //       component: () => import('@/views/system/users/userList'), // Parent router-view
  //       name: 'user',
  //       meta: { title: '人员管理'},
  //       menu:'user_sys'
  //     },
  //     {
  //       path: 'roles',
  //       component: () => import('@/views/system/roles/rolesList'), // Parent router-view
  //       name: 'roles',
  //       meta: { title: '角色模板'},
  //       menu:'user_role'
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

// const createRouter = () => new Router({
//   // mode: 'history', // require service support
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRoutes
// })

// const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

// export default router
