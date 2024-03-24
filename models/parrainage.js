const mongoose = require("mongoose");
const Joi = require('joi');

const parrainageSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    prenom: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    commentaire: {
        type: String,
        required: true,
    }
})

const Parrainage = mongoose.model("Parrainage", parrainageSchema);

const validateParrainage = {
    nom: Joi.string.required,
    prenom: Joi.string.required,
    phone: Joi.number.required,
    email: Joi.string.email,
    commentaire: Joi.string.required
}


exports.Parrainage = Parrainage;
exports.validateParrainage = validateParrainage;
