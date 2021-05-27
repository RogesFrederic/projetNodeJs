
const { Model, DataTypes,  } = require('sequelize')
const { sequelize } = require('../sequelize')


class Tag extends Model {}

Tag.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    content: {
      type: DataTypes.TEXT
    }
}, {
    sequelize,
    modelName: 'Tag'
})

// Dans index.js //
// User.belongsToMany(Role, { throught : 'RoleUser'});
// Role.belongsToMany(User, { throught : 'RoleUser'});


module.exports = { Tag }