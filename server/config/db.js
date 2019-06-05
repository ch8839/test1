const Sequelize = require('sequelize')

const theDb = new Sequelize('tank', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    define:{
        timestamps: false // 取消Sequelzie自动给数据表添加的 createdAt 和 updatedAt 两个时间戳字段
    } 
});
module.exports = {
    theDb
}
