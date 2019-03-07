const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const stringToObjectId = string => mongoose.Types.ObjectId(string);

const bidsSchema = new Schema({
  id: ObjectId,
  dishRequest: { type: Schema.Types.ObjectId, ref: 'dishrequests', set: stringToObjectId },
  foodProvider: { type: Schema.Types.ObjectId, ref: 'foodproviders', set: stringToObjectId },
  status: String,
  price: Number
}, {
  timestamps: true
});

const Bid = mongoose.model("bids", bidsSchema);

module.exports = Bid;