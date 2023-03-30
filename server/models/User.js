const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    require: true,
  },
  displayName: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  image: {
    type: String,
  },
  bio: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  age: {
    type: Number,
  },
  wordList: {
    type: [
      {
        chineseCharacters: { type: String, required: true },
        pinYin: { type: String, required: true },
        hsk: { type: Number },
        definition: { type: String, required: true },
        dateAdded: { type: Date, default: Date.now },
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
