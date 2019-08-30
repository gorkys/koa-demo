/*
 Created by Gorky on 2019/8/2
*/
import demoDB from '../config/db'
const userModel = '../schema/user.js'

const User = demoDB.import(userModel)

const getUserById = async id => {
  return await User.findOne({
    where: {
      id: id
    }
  })
}

const addUser = async (userInfo) => {
 await User.create(userInfo)
}

const editUser = async (id,data) => {
  await User.update({
      username: data.username,
      nickname: data.nickname,
      password: data.password,
      updateTime: data.updateTime
  },{
      where: {
        id: id
      }
  }
   )
}

const delUser = async (id) => {
  await User.destroy({
    where: {
      id: id
    }
  })
}

const getUser = async (data) => {
  const { pageNo, pageSize } = data
  return await User.findAndCountAll({
    limit: parseInt(pageSize),
    offset: (parseInt(pageNo)-1) * parseInt(pageSize),
  }).then(result=>{
    return result
  })
}

export default {
  addUser,
  editUser,
  delUser,
  getUser,
  getUserById
}