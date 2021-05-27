
const { Model, DataTypes,  } = require('sequelize')
const { sequelize } = require('../sequelize')


class User extends Model {}

User.init({
    u_pk_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      u_firstname: {
        type: DataTypes.STRING
      },
      u_lastname: {
        type: DataTypes.STRING
      },
      u_email: {
        type: DataTypes.STRING
      },
      u_password: {
        type: DataTypes.STRING
      },
      u_fk_role_id: {
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