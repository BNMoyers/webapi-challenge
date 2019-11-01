//dependencies and imports
const express = require("express");
const pM = require("./data/helpers/projectModel");
const aM = require("./data/helpers/actionModel");
const router = express.Router();

//requests

//custom middleware

//validate the id of the project
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

//validate that the project has all required parts
function ValidateProject(req, res, next) {
    const name = req.name;
    const description = req.description;

    !name 
        ? res.status(400).json({ errorMessage: 'a project name is required' })
        : !description
            ? res.status(400).json({ errorMessage: 'description required' })
            : next();
        }

        

//export
module.exports = router