
const { Model, DataTypes,  } = require('sequelize')
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

class User extends Model {}

User.init({
    username :{
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'User', //nom de la table = 'Users'
})

module.exports = { User }