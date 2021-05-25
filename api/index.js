const express = require('express');
const app = express();
//app est un objet "Application" instancié par expressJS

//Exemple de middleware

/*
Pour créer une route POST
app.post(URI, (req,res) => {
    Implémentation ici
})

Idem pour put et delete, etc
*/

app.use('/users', require('./users'));
app.use('/posts', require('./posts'));

app.use((req, res, next) => {
    console.log("Je passe dans /api/index.js !");
    next();
});

// app.use('/', (req, res, next) => {
//     //s'execute seulement si les routes commences par / 
//     console.log("2 !");
//     next();
// });

app.get('/', (req, res) => {
    res.send('Hello World !');
    // next({ msg : 'Une erreur est survenue' });
});

app.use((err, req, res, next) => {
    res.status(500).json({ err });
});


module.exports = { app }