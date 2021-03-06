const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const dishesSchema = new Schema({
  name: String,
}, {
  timestamps: true
});

const Dish = mongoose.model("dishes", dishesSchema);

module.exports = Dish;