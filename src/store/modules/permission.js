import { asyncRouterMap, constantRouterMap } from '@/router/index'

/**
 * 判断用户是否拥有此菜单
 * @param menus
 * @param route
 */
function hasPermission(menus, route) {
  if (route.menu) {
    /*
    * 如果这个路由有menu属性,就需要判断用户是否拥有此menu权限
    */
    return menus.indexOf(route.menu) > -1;
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户菜单权限的路由表
 * @param asyncRouterMap
 * @param menus
 */
function filterAsyncRouter(asyncRouterMap, menus) {
  const accessedRouters = asyncRouterMap.filter(route => {
    //filter,js语法里数组的过滤筛选方法
    if (hasPermission(menus, route)) {
      if (route.children && route.children.length) {
        //如果这个路由下面还有下一级的话,就递归调用
        route.children = filterAsyncRouter(route.children, menus)
        //如果过滤一圈后,没有子元素了,这个父级菜单就也不显示了
        return (route.children && route.children.length)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap, //本用户所有的路由,包括了固定的路由和下面的addRouters
    addRouters: [] //本用户的角色赋予的新增的动态路由
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers) //将固定路由和新增路由进行合并, 成为本用户最终的全部路由信息
    }
  },
  actions: {
    GenerateRoutes({ commit }, userPermission) {

      let menuList1 = []
      let menuList2 = []
      let menuList3 = []
      let menuList4 = []

      if (userPermission.userPermissionInfoList.length > 0) {
        for (let i = 0; i < userPermission.userPermissionInfoList.length; i++) {

          menuList1.push(userPermission.userPermissionInfoList[i].menuCode)

          // let userPer = userPermission.userPermissionInfoList[i].permissionCode 
          let userPerChild = userPermission.userPermissionInfoList[i].childPermissionList
          // if (userPer.length > 0) {
          //   for (let j = 0; j < userPer.length; j++) {
          //     userPerList1.push(userPer[j])
          //   }
          // }
          if (userPerChild.length > 0) {
            for (let k = 0; k < userPerChild.length; k++) {

              menuList2.push(userPerChild[k].menuCode)
              
              if(userPerChild[k].childPermissionList.length>0){
                menuList4.push(userPerChild[k].menuCode)
              }
              // for (let m = 0; m < userPerChild[k].permissionCode.length; m++) {
              //   // const element = array[m];
              //   userPerList2.push(userPerChild[k].permissionCode[m])

              // }
            }
          }
        }
      }
      menuList3 = menuList3.concat(menuList1, menuList2,menuList4)
      //生成路由
      return new Promise(resolve => {
        //roles是后台传过来的角色数组,比如['管理员','文章']
        const role = userPermission.roleName;
        const menus = menuList3;
        //声明 该角色可用的路由
        let accessedRouters
        if (role === '管理员') {
          //如果角色里包含'管理员',那么所有的路由都可以用
          //其实管理员也拥有全部菜单,这里主要是利用角色判断,节省加载时间
          accessedRouters = asyncRouterMap
        } else {
          //否则需要通过以下方法来筛选出本角色可用的路由
          accessedRouters = filterAsyncRouter(asyncRouterMap, menus)
        }
        //执行设置路由的方法
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}
export default permission
