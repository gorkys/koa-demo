/*
 Created by Gorky on 2018/10/8
*/
import request from '@/utils/request'

/* 树类型(USER_TREE：用户树；IMAGE_TREE：图片树；VIDEO_TREE：视频树；AUDIO_TREE：音频树；PROGRAM_TREE：节目树；USER_TEMP_TREE：用户模板；SYS_TEMP_TREE：系统模板；TERMINAL_TREE：终端树；广告商：ADVERTISER_TREE)*/
export function getTree(params) {
  return request({
    url: '/api/tree',
    method: 'GET',
    params
  })
}
export function addTree(data) {
  return request({
    url: '/api/tree',
    method: 'POST',
    data
  })
}
export function editTree(data) {
  return request({
    url: '/api/tree',
    method: 'PUT',
    data
  })
}
export function delTree(params) {
  return request({
    url: '/api/tree',
    method: 'DELETE',
    params
  })
}
