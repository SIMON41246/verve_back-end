const express = require('express');
const { Parrainage, validateParrainage } = require('../models/parrainage')
const router = express.Router();

// TODO GET All parrainages
router.get('/', async (req, res) => {
    await Parrainage.find().then((result) => {
        if (!result) { return res.status(401).send("No Parrainage Found") }
        else {
            return res.status(200).json(result);
        }
    }).catch((err) => {
        res.status(500).send(err.message);
    });
})


// TODO POST Parrainage
router.post('/', async (req, res) => {
    try {
        const parrainage = new Parrainage({
            nom: req.body.nom,
            prenom: req.body.prenom,
            phone: req.body.phone,
            email: req.body.email,
            commentaire: req.body.commentaire
        })
        if (!parrainage) {
            return res.status(400).send("No Parrainage Found");
        }
        else {
            await parrainage.save().then((result) => {
                if (!result) { return res.status(400).send("Parrainage Not Found") }
                return res.status(200).send("Ok");
            }).catch((err) => {
                res.status(500).send(err.message);
            });
        }
    }
    catch (err) {
        return res.status(500).send(err.message);
    }

})

router.delete('/:id', async (req, res) => {
    await Reclamation.findByIdAndRemove(req.params.id).then((result) => {
        if (!result) {
            res.status(400).send("Parrainage Not Found");
        }
        res.status(200).send('Parrainage Removed SuccessFully');
    }).catch((err) => {
        res.status(500).send(err.message);
    });
})

module.exports = router;