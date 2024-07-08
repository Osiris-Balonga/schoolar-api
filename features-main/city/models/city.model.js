const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
    {
        status: {
            type: String,
            enum: ["Draft", "Publish", "Deleted"],
            default: "Draft",
        },
        label: String,
        codeObject: String,
        display: Object,
        isExternal: Boolean,
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

        name: {
            type: String,
        },

        geographicalPosition: {
            type: String,
        },

        country: {
            type: mongoose.Schema.ObjectId,
            ref: "country",
        },

        language: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "language",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('city', Schema);