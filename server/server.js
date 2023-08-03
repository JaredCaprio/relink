const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
require("dotenv").config();
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
    origin: [process.env.HOST_NAME, process.env.PREVIEW_HOST],
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
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
      stringify: false,
    }),
    cookie: {
      maxAge: 1209600,
      domain: process.env.COOKIE_DOMAIN,
      secure: true,
      httpOnly: true,
      sameSite: "strict",
    },
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/auth", require("./routes/auth"));
app.use("/", require("./routes/index"));
app.use("/words", require("./routes/words"));
/* app.use("/profile", require("./routes/profile")); */
app.use("/materials", require("./routes/materials"));
app.use("/api", require("./routes/api"));

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
