const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  bgImg: {
    type: String,
  },
  trailerLink: {
    type: String,
  },
  rating: {
    type: String,
  },
  screenType: {
    type: String,
  },
  language: {
    type: String,
  },
  genre: {
    type: String,
  },
  runtime: {
    type: String,
  },
  releaseDate: {
    type: String,
  },
  about: {
    type: String,
  },
});

module.exports = mongoose.model("Movie", MovieSchema);
