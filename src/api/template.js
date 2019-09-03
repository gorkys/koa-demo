/*
 Created by Gorky on 2018/10/12
*/
import request from '@/utils/request'

export function getTemplate(params) {
  return request({
    url: '/template',
    method: 'GET',
    params
  })
}
export function addTemplate(data) {
  return request({
    url: '/template',
    method: 'POST',
    data
  })
}
export function editTemplate(data) {
  return request({
    url: '/template',
    method: 'PUT',
    data
  })
}
export function delTemplate(params) {
  return request({
    url: '/template',
    method: 'DELETE',
    params
  })
}
