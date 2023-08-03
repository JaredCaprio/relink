const axios = require("axios");

module.exports = {
  segmentText: async (req, res, next) => {
    axios
      .post(`${process.env.FLASK_URL}/segmentText`, {
        body: req.body.body,
      })
      .then((data) => {
        console.log(req.body.body, "input");
        console.log(data, "output");
        req.body.body = data.data;
        console.log(req.body.body, "REQUEST.BODY.BODY!!!AFTER AXIOS");
      })
      .catch((error) => {
        console.log(error);
      });

    return next();
  },
};
