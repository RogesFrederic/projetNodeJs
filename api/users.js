/*
* /api/users/js
* Auteur : Frédéric Rogès
*/

const express = require('express');
const { User } = require('../db/model/User');
const app = express();

app.use((req, res, next) => {
    console.log("Je passe dans /api/users.js !");
    next();
});

/**
 * Route : /users/
 * Renvoi la liste de tout les utilisateurs
 */
app.get('/', async (req, res) => {
    try {
        let users = await User.findAll();
        return users ? res.status(200).json(users) : res.status(404).json('No user found');
    }
    catch (err) {
        return res.status(501).json(err);
    }
});

/**
 * Route : /users/:id
 * Renvoi un seul utilisateur
 */
app.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let user = await User.findByPk(id);
        return user ? res.status(200).json(user) : res.status(404).json('User not found');
    }
    catch (err) {
        return res.status(501).json(err);
    }
});

    /*
    POST : 
        '/'     : Crée un utilisateur
            ADMIN 
            Vérifier le format recu
            Format : {
                A DEFINIR
            }*/
app.post('/', (req, res) => {

});

    /*
    DELETE :
        '/:id'  : Supprime un utilisateur
            ADMIN
    */
app.delete('/:id', (req, res) => {
    const { id } = req.params;
    
});

   /*
    PUT : 
        '/:id'  : Modifie un utilisateur
            USER sauf le rôle (uniquement son propre compte ?)
            ADMIN tout
            Vérifier que toutes les infos soient bien passées
    
    PATCH : 
        '/:id'  : Modifie une partie d'un utilisateur
            USER sauf le rôle (uniquement son propre compte ?)
            ADMIN tout
            Vérifier le format
            Format : {
                "op": "write", (lister les opération)
                "field" : "name",
                "value" : "Jonathan"
            }
    

*/


module.exports = app;