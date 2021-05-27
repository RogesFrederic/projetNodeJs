
const { Model, DataTypes,  } = require('sequelize')
const { sequelize } = require('../sequelize')


class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      firstname: {
        type: DataTypes.STRING
      },
      lastname: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      role_id: {
        type: DataTypes.INTEGER,
        foreignKey: true
    }
}, {
    sequelize,
    modelName: 'User'
})
// Dans index.js //
// User.belongsToMany(Role, { throught : 'RoleUser'});
// Role.belongsToMany(User, { throught : 'RoleUser'});


// ........................ //

// Manière compliqué //
// User.belongsTo(Role, {
//     as: 'Role',
//     foreignKey: {
//         name: 'r_id',
//         allowNull: false
//     }
// });

// User.findAll({
//     include: [{
//         model: Role,
//         where: { id: Sequelize.col('u.r_id') }
//     }]
// })

module.exports = { User }