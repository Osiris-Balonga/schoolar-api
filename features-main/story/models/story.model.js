const mongoose = require('mongoose');
const MainSchema = require("../../../shared/models/main.model");

const StorySchema = new mongoose.Schema(
    {
        status:  {
            type: String,
            enum:   ['Success', 'Failed'],
            default: 'Success'
        },
        typeObject: String,
        codeObject: String,
        object: Object,
        display: Object,
        idObject: String,
        action:String,

        city: {
            type: mongoose.Schema.ObjectId,
            ref: 'city',
        },

        person: {
            type: mongoose.Schema.ObjectId,
            ref: 'person',
        },
        country: {
            type: mongoose.Schema.ObjectId,
            ref: 'country',
        },
        user:Object,
        date: String,
        position:{
            lng: Number,
            lat: Number
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('story', StorySchema);
