const jwt = require("jsonwebtoken");
const SECRET =
  process.env.SECRET || "dontunderestimatethreethingsinyourlifeimeandmyself";

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(400).json({ msg: "Invalid Authentication" });
    }
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({ msg: "Invalid Token" });
      }
      req.user = user;
      next();
    });
  } catch (e) {
    return res.status(500).json({ msg: e.message });
  }
};

module.exports = auth;
