const mongoose = require("mongoose");
const MainSchema = require("../../../shared/models/main.model");

const Schema = new mongoose.Schema({
  classroom: { type: String, default: false },
});

Schema.add(MainSchema);
module.exports = mongoose.model("classroom", Schema);
