/*
 Created by Gorky on 2019/8/23
*/
import tem from '../models/template'
import _res from "../utils/response"
import fs from 'fs'
import path from 'path'

const thumbnailUrl = 'http://192.168.1.66:3000/thumbnail/'
const temThumbnail = path.join(__dirname,'../../upload/thumbnail')

const getTemList = async ctx => {
  const data = ctx.query

  const list = await tem.getTem(data)
  const _resData = {
    pages:{
      total: list.count
    },
    temList: list.rows
  }
  ctx.body = _res.success('成功',_resData)
}

const postTem = async ctx => {
  const data = ctx.request.body

  // 检查重名模板
  const repeat = await tem.getTemByName(data.name)
  if(repeat){
    ctx.body = _res.error(`列表中已存在【${data.name}】模板,请修改模板名称`)
    return false
  }

  // see: https://segmentfault.com/a/1190000005364299
  // 接收前台POST过来的base64
  const imgData = data.thumbnail;
  //过滤data:URL
  const base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  const dataBuffer = new Buffer(base64Data, 'base64');

  if(!fs.existsSync(temThumbnail)){
    fs.mkdir(temThumbnail,err => {
      if(err) throw err
      fs.writeFile(`upload/thumbnail/${data.name}.png`, dataBuffer, err=>{
        if(err) return false
      })
    })
  }else {
    fs.writeFile(`upload/thumbnail/${data.name}.png`, dataBuffer, err=>{
      if(err) return false
    })
  }

  data['thumbnail'] = `${thumbnailUrl}${data.name}.png`
  await tem.addTem(data)
  ctx.body = _res.success('成功')
}

const deleteTem = async ctx => {
  const data = ctx.query
  const template = await tem.getTemById(data.id)
  fs.unlink(`upload/thumbnail/${template.name}.png`,err => {
    if (err) throw err;
    tem.delTem(data.id)
  })
  ctx.body = _res.success('成功')
}

export default {
  getTemList,
  postTem,
  deleteTem
}