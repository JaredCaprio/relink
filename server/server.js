const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
require("dotenv").config();
const dotenv = require("dotenv");
const PORT = process.env.PORT || 8080;
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const flash = require("connect-flash");

//suppress mongoose deprecation warning
mongoose.set("strictQuery", true);

//Body parser config
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  cors({
    origin: [
      process.env.HOST_NAME,
      process.env.PREVIEW_HOST,
      "https://play.google.com",
    ],
    credentials: true,
  })
);

console.log(process.env.HOST_NAME);

app.use(flash());
//database connection
connectDB();

//passport Config
require("./config/passport")(passport);

//sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: { expires: false, sameSite: "none", secure: true },
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/", require("./routes/index"));
app.use("/words", require("./routes/words"));
app.use("/auth", require("./routes/auth"));
/* app.use("/profile", require("./routes/profile")); */
app.use("/materials", require("./routes/materials"));
app.use("/api", require("./routes/api"));

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
