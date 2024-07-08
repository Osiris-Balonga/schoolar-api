const mongoose = require("mongoose");
const MainSchema = require("../../../shared/models/main.model");

const Schema = new mongoose.Schema({
  firstname: { type: String, default: false },
  lastname: { type: String, default: false },
  dateOfBirth: { type: Date, default: false },
  gender: {
    type: String,
    enum: ["Masculin", "Féminin"],
    default: false,
  },
  nationality: { type: String, default: false },
  address: { type: String, default: false },
  phone: { type: String, default: false },
  picture: { type: String, default: false },
  classroom: { type: String, default: false },
  tutor: { type: String, default: false },
});

Schema.add(MainSchema);
module.exports = mongoose.model("student", Schema);
