const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

const jwtMiddleware = (req, res, next) => {
  const token =
    req.header("Authorization") && req.header("Authorization").split(" ")[1];
  if (!token) {
    return res.send({
      status: 2,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (ex) {
    return res.send({ status: 3, message: "Invalid token." });
  }
};

module.exports = jwtMiddleware;
