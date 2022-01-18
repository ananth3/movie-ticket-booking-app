const mongoose = require("mongoose");

const TicketSchema = mongoose.Schema({
  seat_number: {
    type: Number,
    required: true,
  },
  is_booked: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: String,
  },
  movie_name: {
    type: String,
  },
});

module.exports = mongoose.model("Ticket", TicketSchema);
