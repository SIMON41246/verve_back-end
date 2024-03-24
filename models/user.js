const mongoose = require("mongoose");
const Joi = require('joi');
const jwt = require('jsonwebtoken');


function validateuser(user) {
    const schema = {
        name: Joi.string().min(5).max(100).required(),
        email: Joi.string().min(10).max(100).email(),
        password: Joi.string().required()
    };
    return Joi.validate(user, schema);
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    }
})
userSchema.methods.generateAuthtoken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    return token;
}
const User = mongoose.model('Users', userSchema);

exports.User = User;
exports.validate = validateuser;
