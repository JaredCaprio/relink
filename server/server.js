const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
require("dotenv").config();
const dotenv = require("dotenv");
const PORT = 8080;
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");

//suppress mongoose deprecation warning
mongoose.set("strictQuery", true);

//Body parser config
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173/", "http://localhost:5173"],
    credentials: true,
  })
);

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
    cookie: { expires: false, sameSite: true },
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/", require("./routes/index"));
app.use("/words", require("./routes/words"));
app.use("/auth", require("./routes/auth"));
/*app.use("/profile", require("./routes/profile"));
app.use("/materials", require("./routes/materials")); */

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
