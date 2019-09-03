import request from '@/utils/request'

/**
 * 登录
 * @param data
 */
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息
 * @param token
 */
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

/**
 * 登出
 */
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
export function getUesr(params) {
  return request({
    url: 'user',
    method: 'GET',
    params
  })
}
export function addUser(data) {
  return request({
    url: 'user',
    method: 'POST',
    data
  })
}
export function editUser(data) {
  return request({
    url: 'user',
    method: 'PUT',
    data
  })
}
export function delUser(params) {
  return request({
    url: 'user',
    method: 'DELETE',
    params
  })
}
