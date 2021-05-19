// const express = require('express');
// const bd = require('./db')
// const { sequelize } = require('./db/sequelize')

// const app = express();


// sequelize.sync({alter:true}).then(()=>{

//     console.log('BDD est prete')
//     app.listen(8080, () => {
//         console.log("Serveur démarré et push ok.");
//     });

// }).catch ((err)=> {
//     console.error(err)
// })

//================================== FRED
const { sequelize } = require('./db');
const { app } = require('./api');


sequelize.sync({ alter: true }).then(() => {
    console.log('DB is ready !');
    app.listen(8080, () => {
        console.log("Server is ready !");
    });
}).catch((err)=>{
    console.error(err);
});