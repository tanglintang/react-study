const Sequelize = require('sequelize')
const sequelize = require('./index')

// 数据表跟对象的映射 
// user => users 单数的user会自动对应users 
const User = sequelize.define('user',{
  id: { 
       type: Sequelize.INTEGER,
       autoIncrement:true,
       primaryKey: true,
       unique: true
      },
  name: { type: Sequelize.STRING },
  age: { type: Sequelize.INTEGER },    
  address: { type: Sequelize.STRING },
  isdelete: { type: Sequelize.INTEGER, allowNull: true }
})


module.exports = User
