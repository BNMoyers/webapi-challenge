//dependencies and imports
const express = require("express");
const aM = require("./data/helpers/actionModel");
const router = express.Router();

//requests

//delete an action
router.delete('/:id', validateActionId, (req, res) =>{
    const id = req.params.id;
    aM.remove(id)
        .then(() => {
            res.status(200).json({ message: `removed action ${id}` })
        })
        .catch(err => {
            res.status(500).json({ errorMessage: `${err}` })
        })
})

//update an action
router.put('/:id', validateActionId, (req, res) => {
    aM.update(req.params.id, req.body)
        .then(() => {
            aM.get(req.params.id)
                .then(action => {
                    res.status(200).json({ message: `successfully updated ${action}` })
                })
        })
        .catch(err => {
            res.status(500).json({ errorMessage: {err} })
        })
})


//custom middleware

//validates action id
function validateActionId(req, res, next) {
    const id = req.params.id;
    aM.get(id)
        .then(actions => {
            !actions
                ? res.status(404).json({ errorMessage: 'invalid id' })
                : (req.actions = actions);
                next();
        })
        .catch(err => {
            res.status(400).json({ errorMessage: {error} })
        })
}

//export
module.exports = router;