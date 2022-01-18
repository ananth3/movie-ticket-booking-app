const Seat = require("../models/Seat");

const router = require("express").Router();

// create seat
router.post("/", async (req, res) => {
  try {
    const newSeat = new Seat({
      seat_number: req.body.seat_number,
      status: req.body.status,
    });
    await newSeat.save();
    res.status(200).json({ status: 200, message: "Seat created successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:seatnumber", async (req, res) => {
  try {
    const seat = await Seat.findOne({ seat_number: req.params.seatnumber });
    res.status(200).json(seat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:seatnumber", async (req, res) => {
  try {
    const seat = await Seat.findOne({ seat_number: req.params.seatnumber });
    await seat.updateOne({ $set: req.body });
    res.status(200).json({ status: 200, message: "Seat updated successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/details/all-seats", async (req, res) => {
  try {
    const seats = await Seat.find({});
    res.status(200).json(seats);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/reset/all-seats", async (req, res) => {
  try {
    const seats = await Seat.find({});
    seats.forEach(emptySeat);
    async function emptySeat(seat) {
      const seatData = await Seat.findById(seat._id);
      seatData.status = "empty";
      await seatData.save();
    }
    res.status(200).json({ status: 200, message: "Reset seats successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
