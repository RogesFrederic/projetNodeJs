const express = require('express');
const bd = require('./db')
const { sequelize } = require('./db/sequelize')

const app = express();


sequelize.sync().then(()=>{

    console.log('BDD est prete')
    app.listen(8080, () => {
        console.log("Serveur démarré et push ok.");
    });

}).catch ((err)=> {
    console.error(err)
})


module.exports = { app }
