const express = require("express");
const app = express();

const dotenv = require("dotenv");
const helmet = require("helmet");
const multer = require("multer");
const path = require("path");

const authRoute = require("./controller/auth");
const ticketRoute = require("./controller/tickets");
const movieRoute = require("./controller/movies");
const seatRoute = require("./controller/seats");
const mongo = require("./db/mongo");
const healthCheck = require("./utils/healthCheck");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

dotenv.config();

// passport config
require("./config/passport")(passport);

// mongo DB connection
mongo();

app.use("/images", express.static(path.join(__dirname, "public/images")));

// middleware
app.use(express.json());
app.use(helmet());

// multer file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (err) {
    console.log(err);
  }
});

// express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// app.use(function (req, res, next) {
//   res.locals.currentUser = req.user;
//   next();
// });

// connect flash
// app.use(flash());

// app.use((req, res, next) => {
//   req.locals.success_msg = req.flash("success_msg");
//   req.locals.error_msg = req.flash("error_msg");
// });

// routes
app.use("/api/auth", authRoute);
app.use("/api/ticket", ticketRoute);
app.use("/api/movie", movieRoute);
app.use("/api/seat", seatRoute);
app.get("/api/db-check", healthCheck);

app.listen(process.env.PORT || 8800, () => {
  console.log("Backend server started");
});
