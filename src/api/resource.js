/*
 Created by Gorky on 2018/10/9
*/
import request from '@/utils/request'
/* 图片*/
export function getImage(params) {
  return request({
    url: '/resource/image',
    method: 'GET',
    params
  })
}
export function delImage(params) {
  return request({
    url: '/resource/image',
    method: 'DELETE',
    params
  })
}
export function uploadImage() {
  return process.env.VUE_APP_BASE_API + '/upload/image'
}
/* 视频*/
export function getVideo(params) {
  return request({
    url: '/resource/video',
    method: 'GET',
    params
  })
}
export function delVideo(params) {
  return request({
    url: '/resource/video',
    method: 'DELETE',
    params
  })
}
export function uploadVideo() {
  return process.env.VUE_APP_BASE_API + '/upload/video'
}
/* 音频*/
export function getAudio(params) {
  return request({
    url: '/api/audio',
    method: 'GET',
    params
  })
}
export function delAudio(params) {
  return request({
    url: '/api/audio',
    method: 'DELETE',
    params
  })
}
export function uploadAudio() {
  return process.env.VUE_APP_BASE_API + '/api/audio/upload'
}
/* 网页*/
export function getHtml5(params) {
  return request({
    url: '/api/html',
    method: 'GET',
    params
  })
}
export function addHtml5(data) {
  return request({
    url: '/api/html',
    method: 'POST',
    data
  })
}
export function editHtml5(data) {
  return request({
    url: '/api/html',
    method: 'PUT',
    data
  })
}
export function delHtml5(params) {
  return request({
    url: '/api/html',
    method: 'DELETE',
    params
  })
}

