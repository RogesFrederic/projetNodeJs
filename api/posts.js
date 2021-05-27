const express = require('express');
const { Post } = require('../db/model/Post')
const app = express();
app.use(express.json());
const { Validator, ValidationError } = require('express-json-validator-middleware');

/*
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

var validator = new Validator({allErrors: true});
var validate = validator.validate;

app.get('/', async(req, res, next) => {
    try { 
        let all = await Post.findAll();
        return res.status(200).json(all);
    } catch (err) {
        next(err);
    }  
});

app.get('/:id', async(req, res, next ) => {
    try { 
        const id = req.params.id // on récupère la valeure dans l'url
        const post = await Post.findByPk(id)// on récupère le livre grâce à son _id
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

app.delete('/:id', async(req, res) => {
    try {  
        const { id } = req.params;
        let isDeletable = await Post.findByPk(id);
        return isDeletable ? deleteUser(id, res) : res.status(404).json('Post not found');
    }
    catch (err) {
        next(err);
    }
});

app.post('',validate({body: postSchema}), async (req,res,next) => {

    const { content } = req.body;
    const { title } = req.body;
    const { publishDate } = req.body;
    const { p_fk_user } = req.body;
    

    console.log("je recupere les données ")
    const post1 = await Post.create({
        p_title : title,
        p_content :content,
        p_fk_user : p_fk_user,
        p_publishDate:publishDate,
    });

    /*
    console.log("The first Post auto-generated ID", post1.p_pk_id);
    res.send("The first Post auto-generated ID: " +post1.p_pk_id )
    */

    res.status(201).json(post1);
})

app.put('/:id', validate({body: postSchema}), async(req,res,next) => {

    const { content , title, p_publishDate, p_fk_user } = req.body;
    const { id } = req.params;

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
})

async function deleteUser(id, res) {
    await Post.destroy({
        where: {
            id: id
        }
    });
    return res.status(204).json();
}

async function removeUser(id, res) {
    // await Post.destroy({
    //     where: {
    //         id: id
    //     }
    // });
    // return res.status(204).json();
}

module.exports = app;