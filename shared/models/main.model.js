const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MainFields = {
  // Définir les champs communs ici
  status: {
    type: String,
    enum: ["Draft", "Publish", "Deleted", "Closed", ""],
    default: "Draft",
  },
  label: String,
  codeObject: String,
  display: Object, 
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

  // ...
};

const MainMethods = {
  // Définir les méthodes communes ici
  // ...
};

const MainOptions = {
  // Définir les options communes ici
  timestamps: true,
  // ...
};

const MainSchema = new Schema(MainFields, MainOptions);
MainSchema.methods = MainMethods;

module.exports = MainSchema;
