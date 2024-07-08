const mongoose = require("mongoose");
const MainSchema = require("../../../shared/models/main.model");

const Schema = new mongoose.Schema(
  {
    addressSuite: {
      type: String,
    },
    address: String,
    region: {
      type: String,
    },
      postalCode: String,
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "city",
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "country",
    },
      enterprise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "enterprise",
    },
    user: Object,
  },
  {
    timestamps: true,
  }
);
Schema.add(MainSchema);

module.exports = mongoose.model("address", Schema);
