const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  user: { type: ObjectId, ref: "User" },
  flight: { type: ObjectId, ref: "Flight" },
});

const bookingModel = mongoose.model("flight", bookingSchema);

module.exports = { bookingModel };
