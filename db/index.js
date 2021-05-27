const { Post } = require('./model/Post')
const { User } = require('./model/User')
const { Role } = require('./model/Role')
const { Permission } = require('./model/Permission')
const { Tag } = require('./model/Tag')
const { sequelize } = require('./sequelize')

module.exports = { User, Post, Role, Permission, sequelize }

Post.belongsTo(User, {as : 'user_id'});
User.hasMany(Post);

Role.hasMany(User);
User.belongsTo(Role, {as : 'role_id'});

Post.belongsToMany(Tag, { through : 'Link_post_tag'});
Tag.belongsToMany(Post, { through : 'Link_post_tag'});

Permission.belongsToMany(Role, { through : 'Link_role_permission'});
Role.belongsToMany(Permission, { through : 'Link_role_permission'});

