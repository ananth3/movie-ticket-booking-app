const mongoose = require("mongoose");
module.exports = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (err) {
    console.log("Database error");
    throw err;
  }
};
