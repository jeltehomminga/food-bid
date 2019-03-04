const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const foodloverSchema = new Schema({
  username: String,
  email: String,
  password: String
}, {
  timestamps: true
});

const Foodlover = mongoose.model("Foodlover", foodloverSchema);

module.exports = Foodlover;