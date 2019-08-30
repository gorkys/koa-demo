/*
 Created by Gorky on 2019/8/22
*/
import FFMpeg from 'fluent-ffmpeg'
FFMpeg.setFfmpegPath('D:/ffmpeg/bin/ffmpeg.exe')
/**
 * 通过FFMpeg获取视频缩略图
 * @param fileName
 */
const screenshots = function(fileName){
  FFMpeg('upload/video/'+ fileName)
    .screenshots({
      timemarks: ['0.5'],
      filename: 'thumbnail-%b.png',
      count: 1,
      folder: 'upload/video'
    })
}
/**
 * 获取视频元信息
 * @param fileName
 * @returns {Promise}
 */
const getInfo = function(fileName) {
  return new Promise(function(resolve, reject) {
    FFMpeg('upload/video/'+ fileName).ffprobe((err,data)=>{
      resolve(data)
    })
}
)}

export default {
  screenshots,
  getInfo
}