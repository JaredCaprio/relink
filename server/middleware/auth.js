module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.send(true);
    } else {
      res.send(false);
    }
  },
  ensureGuest: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect("/");
    } else {
      return next();
    }
  },
};
