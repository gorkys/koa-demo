import demoDB from '../config/db'

const userModel = '../schema/user'
const User = demoDB.import(userModel)

const getUserByName = async name => {
  return await User.findOne({
    where: {
      username: name
    }
  })
}

export default {
    getUserByName
}
