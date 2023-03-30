const express = require("express");
const { v4: uuidv4 } = require("uuid");
const fsPromises = require("fs").promises;
const path = require("path");
const { exec } = require("child_process");
const { stdout } = require("process");
const User = require("../models/User");
const Materials = require("../models/Materials");

module.exports = {
  segmentText: async (req, res) => {
    const uniqueFileName = `${uuidv4()}.utf8`;
    fsPromises.writeFile(
      path.join("./", "stanford-segmenter-2020-11-17", uniqueFileName),
      req.body.inputText
    );
    const command = `segment.bat pku ${uniqueFileName} UTF-8 0`;

    const child = exec(
      command,
      { cwd: "./stanford-segmenter-2020-11-17" },
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error running command ${error}`);
          return;
        }
        const segmentedText = stdout.trim();
        console.log(`Segmented Text ${segmentedText}`);
        console.error(`stderr: ${stderr}`);
        res.send(segmentedText);
      }
    );

    console.log(req.body.inputText);

    child.on("exit", async (code) => {
      try {
        fsPromises.unlink(
          path.join("./", "stanford-segmenter-2020-11-17", uniqueFileName)
        );
      } catch (err) {
        console.log(`command err ${err} exit code ${code}`);
      }
    });
  },
  getIndex: (req, res) => {
    res.sendFile("index.html", {
      root: "./",
    });
  },
  dashboard: async (req, res) => {
    try {
      const materials = await Materials.find({ user: req.user.id })
        .limit(4)
        .sort({ createdAt: -1 });
      const words = await User.find({ _id: req.user.id }, { wordList: 1 });

      res.json({ materials, words });
    } catch (err) {
      console.error(err);
      res.json({ error: "Server Error" });
    }
  },
};
