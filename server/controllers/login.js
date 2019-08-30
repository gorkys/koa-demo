import user from '../models/login'
import jwt from 'jsonwebtoken'
import _res from '../utils/response'

const postUserAuth = async ctx => {
    const data = ctx.request.body
    const userInfo = await user.getUserByName(data.username)

    if(userInfo !== null){
        if(userInfo.password !== data.password){
            ctx.body = _res.error('密码错误！')
        }else {
            const userToken = {
                username: userInfo.username,
                id: userInfo.id
            }
            const secret = 'vue-koa-demo'
            const token = jwt.sign(userToken, secret)

            ctx.body = {
                code: '0000',
                info:'登录成功',
                token: token
            }
        }
    }else {
        ctx.body = _res.error('用户不存在')
    }
}

const getInfo = async ctx=> {
  const { token } = ctx.query

  if(token){
      ctx.body = {
          code: '0000',
          data:{
            roles: ['admin'],
            introduction: 'I am a super administrator',
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            name: 'Super Admin'
          }
      }
  }

}
export default {
    postUserAuth,
    getInfo
}