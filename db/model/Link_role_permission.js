
/*const { Model, DataTypes,  } = require('sequelize')
const { sequelize } = require('../sequelize')
const { Permission } = require('./Permission')
const { Role } = require('./Role')


class Link_role_permission extends Model {}

Link_role_permission.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      p_id: {
        type: DataTypes.INTEGER,
        foreignKey: true
      },
      role_id: {
        type: DataTypes.INTEGER,
        foreignKey: true
      }
}, {
    sequelize,
    modelName: 'Link_role_permission'
})

// Dans index.js //
// Link_role_permission.belongsToMany(Role, { throught : 'RoleUser'});
// Role.belongsToMany(Link_role_permission, { throught : 'RoleUser'});

// Dans index.js //
// Link_role_permission.belongsToMany(Permission, { throught : 'RoleUser'});
// Permission.belongsToMany(Link_role_permission, { throught : 'RoleUser'});

// ........................ //

// Manière compliqué //
// Link_role_permission.belongsTo(Role, {
//   as: 'Role',
//   foreignKey: {
//       name: 'r_id',
//       allowNull: false
//   }
// });

// Link_role_permission.findAll({
//   include: [{
//       model: Role,
//       where: { id: Sequelize.col('l.r_id') }
//   }]
// })

// Manière compliqué //
// Link_role_permission.belongsTo(Permission, {
//   as: 'Permission',
//   foreignKey: {
//       name: 'p_id',
//       allowNull: false
//   }
// });

// Link_role_permission.findAll({
//   include: [{
//       model: Permission,
//       where: { id: Sequelize.col('l.p_id') }
//   }]
// })

module.exports = { Link_role_permission }*/