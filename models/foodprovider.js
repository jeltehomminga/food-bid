const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const foodProviderSchema = new Schema({
  companyName: String,
  email: String,
  password: String,
  street: String,
  houseNumber: String,
  postalCode: String,
  city: String
}, {
  timestamps: true
});

const FoodProvider = mongoose.model("foodproviders", foodProviderSchema);

module.exports = FoodProvider;