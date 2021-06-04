import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'
import router from '../../router'
import store from '../../store'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    role:'',
    userId:'',
    menus:[],
    permissions: [],
    routes: [],
    addRoutes: [],
    addRoutes:[]
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_MENUS: (state, menuList) => {
    state.menus = menuList
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  },
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_USER: (state, userInfo) => {
    state.name = userInfo.username;
    state.avatar = userInfo.username;
    state.userId = userInfo.sysUserId;
    state.role = userInfo.roleName;
    // state.menus = userInfo.userPermissionInfoList;
    // state.permissions = userInfo.userPermissionInfoList;
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userName: username.trim(), password: password }).then(response => {
        const { data } = response

        // setToken('123')
        // commit('SET_TOKEN', '123')
        setToken(response.token)
        commit('SET_TOKEN', response.token)
        
      
        
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit , state}) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        
        let userPerList1 = []
        let userPerList2 = []
        let userPerList3 = []
        let userPerList4= []

        let menuList1 = []
        let menuList2 = []
        let menuList3 = []
        let menuList4 = []
        if (data.userPermissionInfoList.length > 0) {
          for (let i = 0; i < data.userPermissionInfoList.length; i++) {
            
            menuList1.push(data.userPermissionInfoList[i].menuCode)
          
            let userPer = data.userPermissionInfoList[i].permissionCode 
            let userPerChild = data.userPermissionInfoList[i].childPermissionList 
            if (userPer.length > 0) {
              for (let j = 0; j < userPer.length; j++) {
                userPerList1.push(userPer[j])
              }
            }
            if (userPerChild.length > 0) {
              for (let k = 0; k < userPerChild.length; k++) {
                
                menuList2.push(userPerChild[k].menuCode)

                for (let m = 0; m < userPerChild[k].permissionCode.length; m++) {
                  // const element = array[m];
                  userPerList2.push(userPerChild[k].permissionCode[m])

                  if(userPerChild[k].childPermissionList.length>0){
                    menuList4.push(userPerChild[k].menuCode)
                    for(let n = 0;n<userPerChild[k].childPermissionList.length;n++){
                      if(userPerChild[k].permissionCode.length>0){

                        for(let v =0;v<userPerChild[k].childPermissionList[n].permissionCode.length;v++){
                          userPerList4.push(userPerChild[k].childPermissionList[n].permissionCode[v])
                        }
                      }
                      
                    }
                  }    
                }
              }
            }
          }
        }
        userPerList3 = userPerList3.concat(userPerList1,userPerList2,userPerList4)
        console.log('userPerList3>>>',userPerList3)
        commit('SET_PERMISSIONS', userPerList3)
        // commit('SET_PERMISSIONS', data.userPermissionInfoList)

        menuList3 = menuList3.concat(menuList1,menuList2,menuList4)
        commit('SET_MENUS', menuList3)

        // 生成路由
        let userPermission = data;
        console.log('data>>>>',userPermission)
        store.dispatch('GenerateRoutes', userPermission).then(() => {
          //生成该用户的新路由json操作完毕之后,调用vue-router的动态新增路由方法,将新路由添加
          router.addRoutes(store.getters.addRouters)
        })

        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        
        commit('SET_NAME', data)

        const { name, avatar } = data

        
        commit('SET_NAME', data.username)

        commit('SET_AVATAR', data.username)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // must remove  token  first
        // resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

