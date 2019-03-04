const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const foodProviderSchema = new Schema({
  email: String,
  password: String
}, {
  timestamps: true
});

const FoodProvider = mongoose.model("FoodProvider", foodProviderSchema);

module.exports = FoodProvider;