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
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
  },
  grade: { type: Number, default: 0 },
  average: { type: Number, default: 0 },
});

Schema.add(MainSchema);
module.exports = mongoose.model("grade", Schema);
