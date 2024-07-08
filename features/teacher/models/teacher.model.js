const mongoose = require("mongoose");
const MainSchema = require("../../../shared/models/main.model");

const Schema = new mongoose.Schema({
  firstname: { type: String, default: false },
  lastname: { type: String, default: false },
  picture: { type: String, default: false },
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
  },
  classroom_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "classroom",
  },
});

Schema.add(MainSchema);
module.exports = mongoose.model("teacher", Schema);
