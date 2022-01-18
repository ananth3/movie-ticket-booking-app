const router = require("express").Router();
const Movie = require("../models/Movie");

// create a movie
router.post("/", async (req, res) => {
  try {
    const movie = await Movie.findOne({ name: req.body.name });
    if (movie) {
      return res.status(400).json({
        message: "movie already exists",
      });
    }

    const newMovie = new Movie({
      name: req.body.name,
      img: req.body.img,
      bgImg: req.body.bgImg,
      trailerLink: req.body.trailerLink,
      rating: req.body.rating,
      screenType: req.body.screenType,
      language: req.body.language,
      genre: req.body.genre,
      runtime: req.body.runtime,
      releaseDate: req.body.releaseDate,
      about: req.body.about,
    });
    await newMovie.save();
    res.status(200).json({
      status: 200,
      message: "New movie added successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get movie details
router.get("/:id", async (req, res) => {
  try {
    // const movieValid = mongoose.Types.ObjectId.isValid(req.params.id);
    // if (!movieValid) {
    //   return res.status(404).json({
    //     status: 404,
    //     message: "Invalid movie id",
    //   });
    // }
    const movie = await Movie.findOne({ _id: req.params.id });
    if (!movie) {
      return res.status(404).json({
        status: 404,
        message: "Movie not found",
      });
    }
    res.status(200).json({
      status: 200,
      data: movie,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// update movie
router.put("/:id", async (req, res) => {
  try {
    // const movieValid = mongoose.Types.ObjectId.isValid(req.params.id);
    // if (!movieValid) {
    //   return res.status(404).json({
    //     status: 404,
    //     message: "Invalid movie id",
    //   });
    // }
    const movie = await Movie.findOne({ _id: req.params.id });
    if (!movie) {
      return res.status(404).json({
        status: 404,
        message: "Movie not found",
      });
    }
    await movie.updateOne({ $set: req.body });
    res.status(200).json({
      status: 200,
      message: "Movie updated successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete movie
router.delete("/:id", async (req, res) => {
  try {
    const movieValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!movieValid) {
      return res.status(404).json({
        status: 404,
        message: "Invalid movie id",
      });
    }
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 200,
      message: "Movie deleted successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/moviename/:name", async (req, res) => {
  try {
    const movie = await Movie.findOne({ name: req.params.name });
    if (!movie) {
      return res.status(200).json("movie not found");
    }
    res.status(200).json("Movie found");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
