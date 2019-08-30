/*
 Created by Gorky on 2019/8/10
*/
const response ={
  success:(info, data={}) => {
    return {
      code:'0000',
      info: info,
      cust: data
    }
  },
  error:(info) => {
    return {
      code:'9999',
      info: info
    }
  }
}
export default response