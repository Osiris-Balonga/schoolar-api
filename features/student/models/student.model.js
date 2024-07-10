const mongoose = require("mongoose");
const MainSchema = require("../../../shared/models/main.model");

const Schema = new mongoose.Schema({
  firstname: { type: String, default: "" },
  lastname: { type: String, default: "" },
  dateOfBirth: { type: Date },
  gender: {
    type: String,
    enum: ["Masculin", "Féminin"],
    default: "Masculin",
  },
  nationality: { type: String, default: "" },
  address: { type: String, default: "" },
  phone: { type: String, default: "" },
  picture: { type: String, default: "" },
  classroom_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classroom",
  },
  tutor: { type: String, default: "" },
});

Schema.add(MainSchema);
module.exports = mongoose.model("student", Schema);
