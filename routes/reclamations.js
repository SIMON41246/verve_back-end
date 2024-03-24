const express = require('express');
const multer = require("multer");
const { Reclamation } = require('../models/reclamation');
const auth = require('../middleware/verify-auth');
const router = express.Router();
const path = require("path");



const FILE_TYPE_MAP = {
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/jpeg': 'jpeg',
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage })

router.post('/',auth, upload.single("image"), async (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).send('No image in the request');
    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/images/`;
    try {
        const reclamation = new Reclamation({
            categorie: req.body.categorie,
            image: `${basePath}${fileName}`,
            commentaire: req.body.commentaire,
            status: req.body.status,
            date: req.body.date
        })

        if (!reclamation) {
            return res.status(400).send("Reclamation Not Found");
        }
        else {
            return await reclamation.save().then((result) => {
                if (!result) { return res.status(400).send("Reclamation Not Found") }
                else {
                    return res.status(200).send('ok');
                }
            }).catch((err) => {
                res.status(500).send(err.message);
            });
        }
    }
    catch (err) {
        return res.status(500).send(err.message);
    }

})

router.get('/', async (req, res) => {
    const reclamations = await Reclamation.find()
    if (!reclamations) {
        return res.status(401).send("Reclamtion Not Found");
    }
    return res.status(200).json(reclamations);
})

router.put('/:id', async (req, res) => {
    await Reclamation.findByIdAndUpdate(req.params.id, {
        status: req.body.status
    }).then((result) => {
        if (!result) {
            res.status(401).send('No Reclamation Found')
        }
        res.status(200).send("Status Updated Successfully")
    }).catch((err) => {
        res.status(500).send(err.message);
    });
})
router.delete('/:id', async (req, res) => {
    await Reclamation.findByIdAndRemove(req.params.id).then((result) => {
        if (!result) {
            res.status(400).send("Reclamation Not Found");
        }
        res.status(200).send('Reclamation Removed SuccessFully');
    }).catch((err) => {
        res.status(500).send(err.message);
    });
})



module.exports = router


