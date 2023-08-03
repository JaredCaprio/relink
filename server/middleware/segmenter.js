const axios = require("axios");

module.exports = {
  segmentText: async (req, res, next) => {
    axios
      .post("http://127.0.0.1:5000/segmentText", {
        body: req.body.body,
      })
      .then((data) => (req.body.body = data.data))
      .catch((error) => {
        console.log(error);
      });

    return next();
  },
};
