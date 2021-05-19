const express = require('express');
const { User } = require('../db/model/User')
const app = express();

app.post('', async (req,res) => {
    const jane = await User.create({ username: "Jane"});
    console.log("Jane's auto-generated ID:", jane.id);
    res.send("youpi Jane\'s auto-generated ID: " +jane.id )
})
// On va ecrire l'API user  ici

module.exports = app;