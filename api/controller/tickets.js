const router = require("express").Router();
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");

// create a new ticket
router.post("/", async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      seat_number: req.body.seat_number,
    });
    if (ticket && ticket.is_booked) {
      return res
        .status(200)
        .json({ status: 200, message: "Ticket already booked" });
    }
    const newTicket = new Ticket({
      seat_number: req.body.seat_number,
      userId: req.body.userId,
      movie_name: req.body.movie_name,
    });

    const savedTicket = await newTicket.save();
    res.status(200).json({
      status: 200,
      message: "Ticket booked successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a ticket open/close
router.put("/:id", async (req, res) => {
  try {
    const ticketValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!ticketValid) {
      return res.status(404).json({
        status: 404,
        message: "Invalid Ticket id",
      });
    }
    const ticket = await Ticket.findOne({ _id: req.params.id });
    if (!ticket) {
      return res.status(404).json({
        status: 404,
        message: "Ticket not found",
      });
    }
    if (req.body.userId === ticket.passenger.toString()) {
      await ticket.updateOne({ $set: req.body });
      res.status(200).json({
        status: 200,
        message: "Ticket updated successfully",
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "No permission to update this ticket",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// view a ticket status
router.get("/:id", async (req, res) => {
  try {
    const ticketValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!ticketValid) {
      return res.status(404).json({
        status: 404,
        message: "Invalid Ticket id",
      });
    }
    const ticket = await Ticket.findOne({ _id: req.params.id });
    if (!ticket) {
      return res.status(404).json({
        status: 404,
        message: "Ticket not found",
      });
    }
    if (ticket.is_booked) {
      res.status(200).json({
        status: 200,
        message: "Closed Ticket (Booked Ticket)",
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "Open Ticket (Not Booked Ticket)",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all the open ticket list
router.get("/tickets/open", async (req, res) => {
  try {
    const openTicket = await Ticket.find({ is_booked: false });
    res.status(200).json({
      status: 200,
      message: "List of all open tickets",
      data: openTicket,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all the close ticket list
router.get("/tickets/close", async (req, res) => {
  try {
    const closeTicket = await Ticket.find({ is_booked: true });
    res.status(200).json({
      status: 200,
      message: "List of all close tickets",
      data: closeTicket,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// view details of person owning the ticket
router.get("/:id/passenger-details", async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id });
    if (!ticket) {
      return res.status(404).json({
        status: 404,
        message: "Ticket not found",
      });
    }
    const user = await User.findOne({ _id: ticket.passenger });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "Passenger not found",
      });
    }
    const { username, email, phone } = user;
    res.status(200).json({
      status: 200,
      message: "Passenger found successfully",
      data: { username: username, email: email, phone: phone },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/user/seat-number", async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.body.userId });
    tickets.forEach(getSeat);
    async function getSeat(ticket) {
      const seatData = [];
      seatData.push(ticket.seat_number);
    }
    res.status(200).json({
      status: 200,
      message: "Successfully get all the seats of User",
      data: seatData,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Admin reset the server
router.get("/reset/all-tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find({});
    tickets.forEach(deleteTicket);
    async function deleteTicket(ticket) {
      const ticket_data = await Ticket.findByIdAndDelete(ticket._id);
      await ticket_data.save();
    }
    res.status(200).json({
      status: 200,
      message: "Reset the tickets successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
