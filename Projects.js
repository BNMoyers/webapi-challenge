//dependencies and imports
const express = require("express");
const pM = require("./data/helpers/projectModel");
const aM = require("./data/helpers/actionModel");
const router = express.Router();

//requests

//adds a project
router.post('/', validateProject, (req,res) => {
    const body = req.body;
    pM
        .insert(body)
        .then(project => {
            res.status(201).json({ message: `${project.body.name} successfully added` })
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'could not add project' })
        })
})

//adds an action to a project
router.post('/:id/actions', validateProjectId, validateAction, (req, res) =>{
    const body = req.body;
    body.project_id = req.params.id;

    aM
        .insert(body)
        .then(project => {
            res.status(201).json({ message: `${body.name} added to ${project}` })
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'could not add the action'})
        })
})

//fetch all projects
router.get('/', (req, res) = {
    pM
        .get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'could not get projects' })
        })
}
)

//fetch project by id
router.get('/:id', validateProjectId, (req, res) =>{
    res.status(201).json(req.project)
})

//fetch all actions of a specific project
router.get('/:id/actions', validateProjectId, (req, res) => {
    pM.getProjectActions(req.params.id);
    then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: 'could not get actions' })
    })
})

//update a project
router.put('/:id', validateProject, validateProjectId, (req, res) =>{
    pM.update(req.params.id, req.body)
        .then(() => {
            pM
                .get(req.params.id)
                .then(project => {
                    res.status(200).json(project)
                })
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'could not update project' })
        })
})

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
function validateProject(req, res, next) {
    const body = req.body
    const name = req.body.name;
    const description = req.body.description;

    !body
    ? res.status(400).json({ errorMessage: 'missing project data' })
    : !name 
        ? res.status(400).json({ errorMessage: 'a project name is required' })
        : !description
            ? res.status(400).json({ errorMessage: 'description required' })
            : next();
        }

//validate that the action has all required parts
function  validateAction(req, res, next) {
    const body = req.body
    const description = req.body.description;
    const notes = req.body.notes;

    !body
    ? res.status(400).json({ errorMessage: 'missing action data' })
    : !description
        ? res.status(400).json({ errorMessage: 'description required' })
        : !notes
            ? res.status(400).json({ errorMessage: 'notes required' })
            : next();
        }       

//export
module.exports = router
