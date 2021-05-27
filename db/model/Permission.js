
const { Model, DataTypes,  } = require('sequelize')
const { sequelize } = require('../sequelize')


class Permission extends Model {}

Permission.init({
    p_pk_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      p_label: {
        type: DataTypes.STRING
      },
      p_description: {
        type: DataTypes.STRING
      }
}, {
    sequelize,
    modelName: 'Permission'
})

module.exports = { Permission }