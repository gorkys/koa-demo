import Koa from 'koa'
import koaRouter from 'koa-router'
import json from 'koa-json'
import logger from 'koa-logger'

import api from './server/routes/api.js'
import cors from '@koa/cors'
import koaBody from 'koa-body'
import statics from 'koa-static'
import path from 'path'

const app = new Koa()
const router = koaRouter()

app.use(cors());
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 500*1024*1024    // 设置上传文件大小最大限制，默认2M
  }
}))

app.use(json())
app.use(logger())

// 静态服务
app.use(statics(path.join(__dirname, './upload/')))

app.use(async (ctx,next) => {
    await next()
})

router.use('/api', api.routes())

app.use(router.routes())

app.on('error',(err,ctx) => {
    console.log('server error', err)
})

app.listen(3000,()=>{
  console.log('服务启动成功,端口：3000,地址：http://localhost:3000')
})


export default app