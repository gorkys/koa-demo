/*
 Created by Gorky on 2019/8/22
*/
/**
 * 去除后缀名，获取文件名
 * @param text
 * @returns {*}
 */
function splitFileName(text) {
  const pattern = /\.{1}[a-z,0-9]{1,}$/
  if (pattern.exec(text) !== null) {
    return (text.slice(0, pattern.exec(text).index));
  } else {
    return text;
  }
}

/**
 * 秒格式化为时分秒
 * @param value
 * @returns {string}
 */
function formatSeconds(value) {
  let result = parseInt(value)
  let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600)
  let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))
  let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60))
  return `${h}:${m}:${s}`
}

/**
 * 格式化时间
 * @returns {string}
 */
const dateTimeFormat = () => {
  const getDate = new Date().getDate()
  const getMonth = new Date().getMonth() + 1
  let Y = new Date().getFullYear()
  let M = getMonth < 10 ? '0' + getMonth : getMonth
  let D = getDate < 10 ? '0' + getDate : getDate
  const getHours = new Date().getHours()
  const getMinutes = new Date().getMinutes()
  const getSeconds = new Date().getSeconds()
  let h = getHours < 10 ? '0' + getHours : getHours
  let m = getMinutes < 10 ? '0' + getMinutes : getMinutes
  let s = getSeconds < 10 ? '0' + getSeconds : getSeconds
  return `${Y}-${M}-${D} ${h}:${m}:${s}`
}


export default {
  splitFileName,
  formatSeconds,
  dateTimeFormat
}