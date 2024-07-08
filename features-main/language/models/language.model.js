const mongoose = require('mongoose');
const MainSchema = require("../../../shared/models/main.model");



const Schema = new mongoose.Schema({
    label:String,
    flag: String,
    code2 : String,
    isSpeak : Boolean,
    description : Object
}, {
    timestamps: true
});

Schema.add(MainSchema);

module.exports = mongoose.model('language', Schema);
