/*
 Created by Gorky on 2019/8/7
*/
import fs from 'fs'
import path from 'path'
import res from '../models/resource'
import _res from '../utils/response'
import probe from 'probe-image-size'
import FF from '../utils/FFMpeg'
import tools from '../utils/tools'

const imageUrl = `${process.env.SERVER_URL}image/`
const imagePath = path.join(__dirname,'../../upload/image')

const videoUrl = `${process.env.SERVER_URL}video/`
const videoPath = path.join(__dirname,'../../upload/video')

const uploadImage = async ctx => {
    const file = ctx.request.files.file;

    // 检查重名文件
    const repeat = await res.getResByName(file.name)
    if(repeat){
      ctx.body = _res.error(`资源中已存在【${file.name}】文件`)
      return false
    }

    const reader = fs.createReadStream(file.path);	// 创建可读流

    // 获取图片流的尺寸,注意，这里不能直接使用reader,不然会导致图片损坏。
    let measure = await probe(fs.createReadStream(file.path))

    const upStream = fs.createWriteStream(`${imagePath}\\${file.name}`);		// 创建可写流

    const data = {
      name : file.name,
      size : (file.size / 1024 / 1024).toFixed(2),
      measure : `${measure.width}*${measure.height}`,
      thumbnail : `${imageUrl}${file.name}`,
      url: `${imageUrl}${file.name}`,
      type: 'image',
      operator : 'admin',
      time : tools.dateTimeFormat()
    }
    await res.postRes(data)
    if(!fs.existsSync(imagePath)){
      fs.mkdir(imagePath,err => {
        if(err) throw err
        reader.pipe(upStream)	// 可读流通过管道写入可写流
        return ctx.body = _res.success('上传成功')
      })
    }else {
      reader.pipe(upStream)	// 可读流通过管道写入可写流
      return ctx.body = _res.success('上传成功')
    }
}

const getResImageList = async ctx => {
  const data = ctx.query

  const list = await res.getRes(data,'image')
  const _resData = {
    pages:{
      total: list.count
    },
    sources: list.rows
  }
  ctx.body = _res.success('成功',_resData)
}

const delResImage = async ctx => {
  const data = ctx.request.query
  const image = await res.getResById(data.id)

  fs.unlink(`${imagePath}\\${image.name}`, (err) => {
    if (err) throw err;
    res.deleteRes(data.id)
  });
  ctx.body = _res.success('删除成功!')
}

const uploadVideo = async ctx => {
  const file = ctx.request.files.file;

  // 检查重名文件
  const repeat = await res.getResByName(file.name)
  if(repeat){
    ctx.body = _res.error(`资源中已存在【${file.name}】文件`)
    return false
  }

  const reader = fs.createReadStream(file.path);	// 创建可读流

  const upStream = fs.createWriteStream(`${videoPath}\\${file.name}`);		// 创建可写流

  if(!fs.existsSync(imagePath)){
   await fs.mkdir(imagePath,err => {
      if(err) throw err
      reader.pipe(upStream)	// 可读流通过管道写入可写流
    })
  }else {
   await reader.pipe(upStream)	// 可读流通过管道写入可写流
  }

  // 生成缩略图
  FF.screenshots(file.name)
  // 获取视频信息
  const fileInfo = await FF.getInfo(file.name)

  const data = {
    name : file.name,
    size : (file.size / 1024 / 1024).toFixed(2),
    playTime: tools.formatSeconds(fileInfo.streams[0].duration),
    measure : `${fileInfo.streams[0].width}*${fileInfo.streams[0].height}`,
    url: `${videoUrl}${file.name}`,
    thumbnail : `${videoUrl}thumbnail-${tools.splitFileName(file.name)}.png`,
    type: 'video',
    operator : 'admin',
    time : tools.dateTimeFormat()
  }
  await res.postRes(data)
  return ctx.body = _res.success('上传成功')
}

const getResVideoList = async ctx => {
  const data = ctx.query

  const list = await res.getRes(data,'video')
  const _resData = {
    pages:{
      total: list.count
    },
    sources: list.rows
  }
  ctx.body = _res.success('成功',_resData)
}

const delResVideo = async ctx => {
  const data = ctx.request.query
  const image = await res.getResById(data.id)

  fs.unlink(`${videoPath}\\${image.name}`, (err) => {
    if (err) throw err;
    fs.unlink(`${videoPath}\\thumbnail-${tools.splitFileName(image.name)}.png`, (err) => {
      if (err) throw err;
      res.deleteRes(data.id)
    });
  });
  ctx.body = _res.success('删除成功!')
}

export default {
  uploadImage,
  getResImageList,
  delResImage,
  uploadVideo,
  getResVideoList,
  delResVideo
}