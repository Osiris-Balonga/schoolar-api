const mongoose = require("mongoose");
const MainSchema = require("../../../shared/models/main.model");

const Schema = new mongoose.Schema({
  course: { type: String, default: false },
  average: { type: Number, default: 0 },
});

Schema.add(MainSchema);
module.exports = mongoose.model("course", Schema);
