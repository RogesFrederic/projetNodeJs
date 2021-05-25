/** 
* /api/users/js
* Auteur : Frédéric Rogès
*/

const express = require('express');
const { User } = require('../db/model/User');
const { Validator, ValidationError } = require('express-json-validator-middleware');
const app = express();
const validator = new Validator({allErrors: true});
const validate = validator.validate;

app.use(express.json());

const postSchema = {
    type: 'object',
    required: ['firstname', 'lastname', 'email', 'password', 'role_id'],
    properties: {
        firstname: {
            type: 'string'
        },
        lastname: {
            type: 'string'
        },
        email: {
            type: 'string',
            format: 'email'
        },
        password: {
            type: 'string'
        }
    }
}
const putSchema = postSchema;
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
app.post('/', validate({body: postSchema}), async (req, res) => {
    try {
        let user = await User.create(req.body);
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
app.delete('/:id', async (req, res, next) => {
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
 * PUT
 * Route : '/users/:id'
 * Role : USER, sauf le rôle
 * Vérifie le parametre donné et met a jour l'utilisateur
 */
app.put('/:id', validate({body: putSchema}), async (req, res) => {
    const { id } = req.params;
    let userExist = await User.findByPk(id);
    return userExist ? updateUser(id, req, res) : res.status(404).json('User not found');
});

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
    await User.update(req.body,
    {
        where: { id: id }
    });
    return res.status(204).json();
}




module.exports = app;