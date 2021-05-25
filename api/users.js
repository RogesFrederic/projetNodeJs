/*
* /api/users/js
* Auteur : Frédéric Rogès
*/

const express = require('express');
const { User } = require('../db/model/User');
const app = express();
app.use(express.json());

/**
 * GET
 * Route : /users/
 * Renvoi la liste de tout les utilisateurs
 */
app.get('/', async (req, res, next) => {
    try {
        let users = await User.findAll();
        return users ? res.status(200).json(users) : res.status(404).json('No user found');
    }
    catch (err) {
        next(err);
    }
});

/**
 * GET
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
        next(err);
    }
});

/**
* POST 
* Route : /users/
* Vérifie la validité de la requete puis crée un utilisateur
*/
app.post('/', postRequestIsOk, async (req, res) => {
    try {
        let user = await User.create({username: req.body.username});
        return res.status(201).json(user);
    }
    catch (err) {
        next(err);
    }
});

/**
 * DELETE
 * Route : /users/:id
 * Supprime un utilisateur
 * Droit : ADMIN
 */
app.delete('/:id', async (req, res) => {
    try {  
        const { id } = req.params;
        let isDeletable = await User.findByPk(id);
        return isDeletable ? deleteUser(id, res) : res.status(404).json('User not found');
    }
    catch (err) {
        next(err);
    }
});

/**
 * PATCH
 * Route : '/users/:id'
 * Role : USER, sauf le rôle
 * Vérifie le parametre donné et met a jour l'utilisateur
 */
app.patch('/:id', patchRequestIsOk, async (req, res) => {
    const { id } = req.params;
    let userExist = await User.findByPk(id);
    return userExist ? updateUser(id, req, res) : res.status(404).json('User not found');
});

/**
 * Vérifie si la requete POST est correcte
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function postRequestIsOk(req, res, next) {
    req.body.username ? next() : res.status(400).json("Bad request");
}
/**
 * Vérifie si la requete PATCH est correcte
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function patchRequestIsOk(req, res, next) {
    let { field, op } = req.body;
    switch (op) {
        case "delete":
            req.body.value = "";
            next();
            break;
        case "write":
            switch (field) {
                case 'username':
                    next();
                    break;
                //case firstname:
                //case lastname:
                //....
                default:
                    res.status(400).json("Bad Request");
            }
            break;
        default:
            res.status(400).json("Bad Request");
    }
    
}

/**
 * Supprime un utilisateur et retourne le statut
 * @param {*} id 
 * @param {*} res 
 * @returns 
 */
async function deleteUser(id, res) {
    await User.destroy({
        where: {
            id: id
        }
    });
    return res.status(204).json();
}

async function updateUser(id, req, res) {
    const { field, value } = req.body;
    await User.update({
        [field]: value
    },
    {
        where: { id: id }
    });
    return res.status(204).json();
}

module.exports = app;