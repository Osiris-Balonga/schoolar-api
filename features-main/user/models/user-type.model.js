const mongoose = require('mongoose');
const MainSchema = require("../../../shared/models/main.model");


const Schema = new mongoose.Schema({


    name: {
        type: String,
    },

    phone: {
        type: String,
    },

    email: {
        type: String,

    },
    object: {
        type: String,
    },
    message: {
        type: String,
    },
    fichier: {
        type: String,
    },

    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employer",
    },

}, {
    timestamps: true
});


Schema.add(MainSchema);

module.exports = mongoose.model('userType ', Schema);
