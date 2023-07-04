const express = require("express");
const { v4: uuidv4 } = require("uuid");
const fsPromises = require("fs").promises;
const path = require("path");
const { exec } = require("child_process");
const { stdout } = require("process");
const User = require("../models/User");
const Materials = require("../models/Materials");
const { PythonShell } = require("python-shell");

module.exports = {
  segmentText: async (req, res, next) => {
    let options = {
      pythonPath: "python",
      scriptPath: "./python",
      pythonOptions: ["-u"],
      args: [req.body.body],
    };
    PythonShell.run("jieba-segment.py", options).then((message) => {
      console.log(message[0]);
      req.body.body = message[0];
      return next();
    });
  },
};
