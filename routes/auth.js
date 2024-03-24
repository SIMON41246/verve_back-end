const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const { User } = require('../models/user');
const express = require("express");
const router = express.Router();


//TODO How to do authentication 
router.post("/register", async (req, res) => {

    try {
        //const { error } = validate(req.body);
        //if (error) res.status(400).send(error.details[0].message);
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("User already registred");
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        const token = user.generateAuthtoken();
        await user.save().then((result) => {
            if (result) { return res.header('x-auth-token', token).send("User Created SuccessFully") }
            else {
                res.status(400).send("Something Failed")
            }
        }).catch((err) => {
            res.status(500).send(err.message);
        });;
    } catch (ex) {
        res.status(500).send(ex.message);
    }
})

router.post('/login', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) { return res.status(400).send('Invalid email or Password') }
        const validePassword = await bcrypt.compare(req.body.password, user.password);
        if (!validePassword) { return res.status(400).send('Invalid email or Password') }
        const token = user.generateAuthtoken();
        res.send(token);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

function validate(user) {
    const schema = {
        email: Joi.string().min(10).max(100).email(),
        password: Joi.string().required()
    };
    return Joi.validate(user, schema);
}

module.exports = router;