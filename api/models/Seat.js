const mongoose = require("mongoose");

const SeatSchema = mongoose.Schema({
  seat_number: {
    type: Number,
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("Seat", SeatSchema);
