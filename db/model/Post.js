
const { Model, DataTypes  } = require('sequelize')
const { sequelize } = require('../sequelize')
// Ancienne méthode
// =================
// const User = sequelize.define ('User', {
//     username : {
//         type: DataTypes.STRING
//     }
// });


// Nouvelle méthode
// =================

class Post extends Model {}

Post.init({
    p_title :{
        type: DataTypes.STRING
    },
    p_comment :{
        type: DataTypes.STRING
    },
    p_publishDate :{
        type: DataTypes.DATE
    },
    p_fk_user :{
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: 'Post', //nom de la table = 'Post'
})

module.exports = { Post }