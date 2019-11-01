//dependencies and imports
const express = require("express");
const aM = require("./data/helpers/actionModel");

//requests


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