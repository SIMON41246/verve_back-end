const { array } = require('joi');
const mongoose = require('mongoose');

const reclamationSchema = mongoose.Schema({
    categorie: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    commentaire: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "En Cours", "Traité"]
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Reclamation = mongoose.model('Reclamation', reclamationSchema);

exports.Reclamation = Reclamation;