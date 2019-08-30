/*
 Created by Gorky on 2019/8/2
*/
import login from '../models/login'
import user from '../models/user'
import tools from '../utils/tools'
import _res from "../utils/response";

const postUserInfo = async ctx => {
  const data = ctx.request.body
  const userAuth = await login.getUserByName(data.username)

  if(userAuth === null){
    let userInfo = {
      username: data.username,
      password: data.password,
      nickname: data.nickname,
      creationTime: tools.dateTimeFormat(),
      updateTime: tools.dateTimeFormat()
    }
    await user.addUser(userInfo)
    ctx.body = _res.success('新建成功!')
  }else {
    ctx.body = _res.error('用户已存在!')
  }
}

const putUserInfo = async ctx => {
  const data = ctx.request.body
  const userAuth = await user.getUserById(data.id)

  if(userAuth !== null){
    const userInfo = {
      password: data.password,
      updateTime: tools.dateTimeFormat(),
      username: data.username,
      nickname: data.nickname
    }
    await user.editUser(data.id, userInfo)
    ctx.body = _res.success('编辑成功!')
  }else {
    ctx.body = _res.error('用户已存在!')
  }
}

const delUserInfo = async ctx => {
  const data = ctx.request.query
  await user.delUser(data.id)
  ctx.body = _res.success('删除成功!')
}

const getUserList = async ctx => {
  const data = ctx.query

  const list = await user.getUser(data)
  const _resData = {
    pages:{
      total: list.count
    },
    userList: list.rows
  }
  ctx.body = _res.success('成功',_resData)
}


export default {
  postUserInfo,
  putUserInfo,
  delUserInfo,
  getUserList
}