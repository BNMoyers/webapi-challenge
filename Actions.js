//dependencies and imports
const express = require("express");
const aM = require("./data/helpers/actionModel");
const router = express.Router();

//requests

//fetch all actions
router.get('/', (req, res) => {
    aM
        .get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'could not get actions' })
        })
}
)

//fetch action by id
router.get('/:id', validateActionId, (req, res) =>{
    res.status(201).json(req.action)
})

//delete an action
router.delete('/:id', validateActionId, (req, res) =>{
    const id = req.params.id;
    aM.remove(id)
        .then(() => {
            res.status(200).json({ message: 'removed action' })
        })
        .catch(err => {
            res.status(500).json({ errorMessage: {err} })
        })
})

//update an action
router.put('/:id', validateActionId, (req, res) => {
    aM.update(req.params.id, req.body)
        .then(() => {
            aM.get(id)
                .then(action => {
                    res.status(200).json('successfully updated action')
                })
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


//custom middleware

//validates action id
function validateActionId(req, res, next) {
    const id = req.params.id;
    aM.get(id)
        .then(action => {
            !action
                ? res.status(404).json({ errorMessage: 'invalid id' })
                : (req.action = action);
                next();
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

//export
module.exports = router;