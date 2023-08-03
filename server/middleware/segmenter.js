const axios = require("axios");

module.exports = {
  segmentText: async (req, res, next) => {
    try {
      const res = await axios.post(`${process.env.FLASK_URL}/segmentText`, {
        body: req.body.body,
      });

      console.log(req.body.body, "input");
      console.log(res.data, "output");

      req.body.body = res.data;
    } catch (error) {
      console.log(error);
      return next(error);
    }

    return next();
  },
};
