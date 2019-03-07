const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodloverSchema = new Schema({
  username: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  street: String,
  houseNumber: String,
  postalCode: String,
  city: String,
}, {
    timestamps: true
  });

const Foodlover = mongoose.model("foodlovers", foodloverSchema);

module.exports = Foodlover;