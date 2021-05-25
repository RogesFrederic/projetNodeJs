
const { Model, DataTypes,  } = require('sequelize')
const { sequelize } = require('../sequelize')


class Permission extends Model {}

Permission.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      label: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      }
}, {
    sequelize,
    modelName: 'Permission'
})

module.exports = { Permission }