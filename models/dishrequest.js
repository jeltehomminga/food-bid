const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const stringToObjectId = string => mongoose.Types.ObjectId(string);

const dishRequestsSchema = new Schema({
    id: ObjectId,
    dish: { type: Schema.Types.ObjectId, ref: 'dishes', set: stringToObjectId },
    foodlover: { type: Schema.Types.ObjectId, ref: 'foodlovers', set: stringToObjectId },
    comment: String,
    delivery: String,
    requestTime: Date,
}, {
        timestamps: true
    });

const DishRequest = mongoose.model("dishrequests", dishRequestsSchema);

module.exports = DishRequest;