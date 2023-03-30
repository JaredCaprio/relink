module.exports = {
  getMessages: (req, res) => {
    const messages = req.flash();
    res.json(messages);
  },
};
