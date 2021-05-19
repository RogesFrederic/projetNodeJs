
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
    comment :{
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'Post', //nom de la table = 'Users'
})

module.exports = { Post }