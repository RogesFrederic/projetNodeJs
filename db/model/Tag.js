
const { Model, DataTypes,  } = require('sequelize')
const { sequelize } = require('../sequelize')


class Tag extends Model {}

Tag.init({
    t_pk_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    t_content: {
      type: DataTypes.TEXT
    }
}, {
    sequelize,
    modelName: 'Tag'
})

// Dans index.js //
// Post.belongsToMany(Tag);
// Tag.belongsToMany(Post);


module.exports = { Tag }