const mongoose = require("mongoose");
const MainSchema = require("../../../shared/models/main.model");

const Schema = new mongoose.Schema({
  academic_year: { type: String, default: "" },
});

Schema.add(MainSchema);
module.exports = mongoose.model("academicYear", Schema);
