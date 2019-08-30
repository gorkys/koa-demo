import auth from '../controllers/login'
import user from '../controllers/user'
import resource from '../controllers/resource'
import template from '../controllers/tempalte'

import koaRouter from 'koa-router'
const router = koaRouter()

router.post('/login', auth.postUserAuth)
router.get('/user/info', auth.getInfo)

router.post('/user',user.postUserInfo)
router.put('/user', user.putUserInfo)
router.delete('/user', user.delUserInfo)
router.get('/user',user.getUserList)

router.post('/upload/image',resource.uploadImage)
router.get('/resource/image',resource.getResImageList)
router.delete('/resource/image',resource.delResImage)

router.post('/upload/video',resource.uploadVideo)
router.get('/resource/video',resource.getResVideoList)
router.delete('/resource/video',resource.delResVideo)

router.get('/template',template.getTemList)
router.post('/template',template.postTem)
router.delete('/template',template.deleteTem)
export default router