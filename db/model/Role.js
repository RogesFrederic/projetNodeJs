
const { Model, DataTypes,  } = require('sequelize')
const { sequelize } = require('../sequelize')


class Role extends Model {}

Role.init({
      r_pk_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      r_label: {
        type: DataTypes.STRING
      },
      r_description : {
        type: DataTypes.TEXT
      }
}, {
    sequelize,
    modelName: 'Role'
})

module.exports = { Role }