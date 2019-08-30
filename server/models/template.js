/*
 Created by Gorky on 2019/8/23
*/
import demoDB from '../config/db'
const temModel = '../schema/template'
const eleModel = '../schema/elements'
const setModel = '../schema/setting'

const Tem = demoDB.import(temModel)
const Ele = demoDB.import(eleModel)
const Set = demoDB.import(setModel)

//多对多链接
// Tem.belongsToMany(Ele, {through: Set,foreignKey: 'templateId', otherKey: 'elementsId'});

Ele.belongsToMany(Tem, {through: Set, foreignKey: 'elementsId'});
Tem.belongsToMany(Ele, {through: Set, foreignKey: 'templateId' });


const addTem = async (data) => {
  const tempData = {
    thumbnail : data.thumbnail,
    width : data.width,
    height : data.height,
    name : data.name,
    proTime : data.proTime,
    resolution : data.resolution,
    terminalType : data.terminalType
  }
  const template =  await Tem.create(tempData); //返回创建的post对象
  for(let item of data.elements){
    const eleData = {
      id: item.id,
      x: item.x,
      y: item.y,
      type: item.type,
      width: item.width,
      height: item.height,
      label: item.label,
      zIndex: item.zIndex,
      locking: item.locking,
      active: item.active,
      templateId: template.id
    }
    await Ele.create(eleData)
    const setData = {
      resourceAddress: item.setting.resourceAddress,
      thumbnail: item.setting.thumbnail,
      switchEffects:item.setting.switchEffects,
      admissionEffect:item.setting.admissionEffect,
      textContent: item.setting.textContent,
      textColor: item.setting.textColor,
      bgColor: item.setting.bgColor,
      bold: item.setting.bold,
      italic: item.setting.italic,
      underline: item.setting.underline,
      align: item.setting.align,
      speed: item.setting.speed,
      direction: item.setting.direction,
      fontSize: item.setting.fontSize,
      font:item.setting.font,
      elementsId:item.id,
      templateId:template.id
    }
    await Set.create(setData)
  }
}

const getTem = async (data) => {
  const { pageNo, pageSize } = data
  return await Tem.findAndCountAll({
    include: [Ele],
    limit: parseInt(pageSize),
    offset: (parseInt(pageNo)-1) * parseInt(pageSize),
    subQuery:true //不让在子查询里分页，全局处理
  }).then(result=>{
    return result
  })
}

const delTem = async (id) => {
  await Tem.destroy({
    where: {
      id: id
    }
  })
  await Ele.destroy({
    where: {
      templateId: id
    }
  })
  await Set.destroy({
    where: {
      templateId: id
    }
  })
}

const getTemById = async id => {
  return await Tem.findOne({
    where: {
      id: id
    }
  })
}

const getTemByName = async name =>{
  return await  Tem.findOne({
      where: {
        name: name
      }
  })
}

export default {
  addTem,
  getTem,
  delTem,
  getTemById,
  getTemByName
}