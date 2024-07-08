const mongoose = require("mongoose");
const MainSchema = require("../../../shared/models/main.model");

const Schema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
  },
  academicYear_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "academicYear",
  },
  classroom_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classroom",
  },
  is_repeating: { type: Boolean, default: false },
});

Schema.add(MainSchema);
module.exports = mongoose.model("enrollment", Schema);
