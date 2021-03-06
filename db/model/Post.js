
const { Model, DataTypes  } = require('sequelize')
const { sequelize } = require('../sequelize')



class Post extends Model {}

Post.init(
    {
        p_pk_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        p_content: {
            type: DataTypes.TEXT
        },
        p_title: {
            type: DataTypes.STRING
        },
        p_publishDate: {
            type: DataTypes.DATE
        },
    }, 
    {
        sequelize,
        modelName: 'Post'
    }
)

// Dans index.js //
// Post.belongsTo(User);
// User.hasMany(Post);

// ........................ //

// Manière compliqué //
// Post.belongsTo(User, {
//     as: 'User',
//     foreignKey: {
//         name: 'u_id',
//         allowNull: false
//     }
// });

// Post.findAll({
//     include: [{
//         model: User,
//         where: { id: Sequelize.col('p.u_id') }
//     }]
// })

module.exports = { Post }