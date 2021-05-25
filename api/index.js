const express = require('express');
const app = express();

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
    res.send('Hello World !, je suis dans la première page !');
    // next({ msg : 'Une erreur est survenue' });
});

app.use((err, req, res, next) => {
    /*
    if(err instanceof HttpError) {
        res.status(err.code).json(err);
    } else {
        res.status(500).json(err);
    }
    */
    res.status(500).json({ err });
});

module.exports = { app }