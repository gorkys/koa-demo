import Sequelize from 'sequelize'
// 从.env为nodejs项目加载环境变量. see: https://github.com/motdotla/dotenv
import * as dotEnv from 'dotenv'

dotEnv.config()

const demo = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST || 'localhost'}/demo`,{
    define:{
        timestamps: false // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
    },
    timezone: '+08:00', // 东八时区
    // 时间格式化 see: https://segmentfault.com/a/1190000020009630
    dialectOptions: {
        dateStrings: true,
        typeCast: true
    }
})

export default demo