const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

exports.tokenGenerator = async (paylaod) => {
  const token = jwt.sign(paylaod, SECRET);
  return token;
};
