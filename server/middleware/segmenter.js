const axios = require("axios");

module.exports = {
  segmentText: async (req, res, next) => {
    axios
      .post(`${FLASK_URL}/segmentText`, {
        body: req.body.body,
      })
      .then((data) => (req.body.body = data.data))
      .catch((error) => {
        console.log(error);
      });

    return next();
  },
};
