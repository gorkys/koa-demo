/*
 Created by Gorky on 2019/8/8
*/
import demoDB from '../config/db'
const resModel = '../schema/resource'


const Res = demoDB.import(resModel)

// 根据ID获取资源
const getResById = async id => {
  return await Res.findOne({
    where: {
      id: id
    }
  })
}
// 查询资源名
const getResByName = async name => {
  return await Res.findOne({
    where: {
      name: name
    }
  })
}

// 获取资源列表
const getRes = async (data,type) => {
  const { pageNo, pageSize } = data
   return await Res.findAndCountAll({
      where:{
        type: type
      },
      limit: parseInt(pageSize),
      offset: (parseInt(pageNo)-1) * parseInt(pageSize),
    }).then(result=>{
      return result
    })
}
// 上传资源
const postRes = async data => {
  await Res.create(data)
}
// 删除资源
const deleteRes = async (id) => {
  await Res.destroy({
    where: {
      id: id
    }
  })
}

export default {
  getResById,
  getRes,
  postRes,
  deleteRes,
  getResByName
}