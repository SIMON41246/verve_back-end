const mongoose = require("mongoose");
require('dotenv').config()
const express = require("express");
const parrainages = require('./routes/parrainages');
const reclamations = require('./routes/reclamations');
const authentication = require("./routes/auth");
const app = express();
app.use(express.json());
app.use('/images', express.static(__dirname + '/images'));
app.use('/api/parrainage', parrainages);
app.use('/api/reclamation', reclamations);
app.use('/api/auth', authentication);

mongoose.connect("mongodb://127.0.0.1:27017/verve", {
    dbName: "verve"
})
    .then(() => console.log("Connected to the database"))
    .catch((err) => console.error(err));


app.listen(3000, () => {
    console.log("Listening to port 3000");
})