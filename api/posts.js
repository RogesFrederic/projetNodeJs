/** 
* /api/posts/js
* Auteur : Céline 
*/

const express = require('express');
const { Post } = require('../db/model/Post');
const { Validator, ValidationError } = require('express-json-validator-middleware');
const { Op } = require("sequelize");
const app = express();
var validator = new Validator({allErrors: true});
var validate = validator.validate;


app.use(express.json());

/* pour créer les classes erreurs 
===================================

class HttpError extends Error {
    constructor(code = 500, message = "HTTP Error") {
        super(message);
        this.code = code;
    }
}

class NotFoundError extends HttpError {
    constructor() {
        super(404, "Not Found");
    }
}
*/

// JSON Schema definit de post
const postSchema = { 
    type: 'object',
    required: ['content', 'title'],
    properties: {
        content :{"type": "string"},
        title : {"type": "string"} ,
        publishDate : {
            "type": "string" , 
            "format" : "date-time"
        } ,
        p_fk_user : {"type": "integer"} 
    }
}

/**
 * GET
 * Route : /posts/
 * Renvoi la liste de tous les posts 
 * @queryParam title string Renvoi les posts filtrés par mot clef dans un titre
 * @queryParam tags string[] separé par une virgule Renvoi les posts filtrés par tag
 * @queryParam keyword string Renvoi les posts filtrés par mot clef
 *
 */
 app.get('/', async(req, res, next) => {
    try {
        let all;
        const { title, tags, keyword } = req.query;
        switch (true) {
            case ('title' in req.query):
                console.log(title);
                all = await Post.findAll({
                        where: { p_title :{[Op.like]: '%'+ title +'%'}}                  
                    });
                break;
            case ('tags' in req.query):
                break;
            case ('keyword' in req.query):
                all = await Post.findAll({
                    where: {
                        [Op.or]: [
                                { p_content :{[Op.like]: '%'+keyword +'%'}}, 
                                { p_title :{[Op.like]: '%'+keyword +'%'}}                  
                        ]
                    }
                });
                break;
            default:
                all = await Post.findAll();
            
        }
        res.status(200).json(all);
    } catch (err) {
        next(err);
    }
});

/**
 * GET
 * Route : /posts/:id
 * Renvoi le post dont l'id est en parametre
 */
app.get('/:id', async(req, res, next ) => {
    try { 
        const id = req.params.id;
        const post = await Post.findByPk(id);
        return post ? res.status(200).json(post) : res.status(404).json({ msg: 'Post not found' });
        /*
            if(!post) {
                throw new NotFoundError();
            }
            res.status(200).json(post)
        */
    } catch (err) {
        next(err);
    }  
})


/**
 * DELETE
 * Route : /posts/:id
 * supprime le post dont l'id est en parametre
 */
app.delete('/:id', async(req, res, next) => {
    try {  
        const { id } = req.params;
        let isDeletable = await Post.findByPk(id);
        return isDeletable ? deletePost(id, res) : res.status(404).json('Post not found');
    }
    catch (err) {
        next(err);
    }
});

/**
 * POST
 * Route : /posts
 * créer un post => verification des données en amont
 */
app.post('',validate({body: postSchema}), async (req,res,next) => {

    const { content , title, publishDate,p_fk_user } = req.body;
    const post1 = await Post.create({
        p_title : title,
        p_content :content,
        p_fk_user : p_fk_user,
        p_publishDate:publishDate,
    });
    res.status(201).json(post1);
})


/**
 * PUT
 * Route : /posts/:id
 * met à jour un post => verification des données en amont
 */
app.put('/:id', validate({body: postSchema}), async(req,res,next) => {

    try {  
        const { id } = req.params;
        let isUpdate = await Post.findByPk(id);
        return isUpdate ? updatePost(id,req, res) : res.status(404).json('Post not found');
    }
    catch (err) {
        next(err);
    }
})

/**
 * Supprime un post et retourne le statut
 * @param {*} id 
 * @param {*} res 
 * @returns 
 */
async function deletePost(id, res) {
    await Post.destroy({
        where: {
            id: id
        }
    });
    return res.status(204).json();
}

/**
 * met à jour un post et retourne le statut
 * @param {*} id 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function updatePost(id, req, res) {

    const { content , title, p_publishDate, p_fk_user } = req.body;
    await Post.update({
        p_title : title,
        p_content :content,
        p_fk_user : p_fk_user,
        p_publishDate:p_publishDate,
    }, 
    {where: { p_pk_id : id }}
    );

    // await Post.update(req.body, {
    //     where: { p_pk_id: id }
    // })
    
    return res.status(200).json(id  + " is update ");
}

module.exports = app;