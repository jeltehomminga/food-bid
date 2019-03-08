const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const stringToObjectId = string => mongoose.Types.ObjectId(string);

const ordersSchema = new Schema({
  id: ObjectId,
  dishRequest: { type: Schema.Types.ObjectId, ref: 'dishrequests', set: stringToObjectId },
  foodLover: { type: Schema.Types.ObjectId, ref: 'foodlovers', set: stringToObjectId },
  foodProvider: { type: Schema.Types.ObjectId, ref: 'foodproviders', set: stringToObjectId },
  dish: { type: Schema.Types.ObjectId, ref: 'dishes', set: stringToObjectId },
  bid: { type: Schema.Types.ObjectId, ref: 'bids', set: stringToObjectId },
  paid: Boolean,
  status: String
}, {
  timestamps: true
});

const Order = mongoose.model("orders", ordersSchema);

module.exports = Order;