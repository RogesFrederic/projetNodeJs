
const { Model, DataTypes,  } = require('sequelize')
const { sequelize } = require('../sequelize')


class Role extends Model {}

Role.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      label: {
        type: DataTypes.STRING
      },
      description : {
        type: DataTypes.TEXT
      }
}, {
    sequelize,
    modelName: 'Role'
})

module.exports = { Role }