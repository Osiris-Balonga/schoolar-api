const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
    {
        status: {
            type: String,
            enum: ["Draft", "Publish", "Deleted"],
            default: "Draft",
        },
        picture: String,
        cover: String,

        label: String,
        function: String,
        role: [String],//doctor, student, particular, etc..
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "user",
        },
        codeObject: String,
        display: Object,
        website: String,
        description: String,
        civility: {
            type: String,
        },
        name: {
            type: String,
        },

        firstName: {
            type: String,
        },

        gender: {
            type: String,
        },
        birthdayDate: {
            type: String,
        },
        email: {
            type: String,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email'
            ]
        },
        fixPhone: {
            type: String,
        },
        phone: {
            type: String,
        },

        address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "address",
        },

        createdBy: {
            type: mongoose.Schema.ObjectId,
            ref: "user",
        },
        updatedBy: {
            type: mongoose.Schema.ObjectId,
            ref: "user",
        },
        deletedBy: {
            type: mongoose.Schema.ObjectId,
            ref: "user",
        },
        deletedAt: Date,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("person", Schema);
