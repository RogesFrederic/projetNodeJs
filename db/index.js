const { Post } = require('./model/Post')
const { User } = require('./model/User')
//const { Link_role_permission } = require('./model/Link_role_permission')
const { Role } = require('./model/Role')
const { Permission } = require('./model/Permission')
const { sequelize } = require('./sequelize')

module.exports = { User, Post, /*Link_role_permission,*/ Role, Permission, sequelize }

Post.hasMany(User);
User.belongsTo(Post);

Role.hasMany(User);
User.belongsTo(Role);

Permission.belongsToMany(Role, { through : 'Link_role_permission'});
Role.belongsToMany(Permission, { through : 'Link_role_permission'});

/*Link_role_permission.belongsToMany(Role, { throught : 'Link_role_permissionRole'});
Role.belongsToMany(Link_role_permission, { throught : 'Link_role_permissionRole'});

Link_role_permission.belongsToMany(Permission, { throught : 'Link_role_permissionPermission'});
Permission.belongsToMany(Link_role_permission, { throught : 'Link_role_permissionPermission'});*/