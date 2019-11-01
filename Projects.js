//dependencies and imports
const express = require("express");
const pM = require("./data/helpers/projectModel");
const aM = require("./data/helpers/actionModel");
const router = express.Router();

//requests

//custom middleware
function validateProjectId(req,res, next) {
    const id = req.params.id;
    pM
        .get(id)
        .then(project =>{
            !project 
                ? res.status(404).json({ errorMessage: "invalid project id" })
                : (req.project = project);
            next();
        })
        .catch(err => {
            res.status(400).json({ errorMessage: `${err}` })
        })

}

//export
module.exports = router
