import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/getUserInfo',
    method: 'get',
    headers:{
      token:token
    }
    // params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/loginOut',
    method: 'post'
  })
}
