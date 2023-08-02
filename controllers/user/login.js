const pool = require("../../dbConfig.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.send({ status: 1, message: "Username and password are required" });
    return;
  }

  try {
    const userResult = await pool.query(
      "SELECT * FROM newz.usr WHERE username = $1",
      [username]
    );
    const user = userResult.rows[0];

    if (!user) {
      res.send({ status: 1, message: "Invalid username" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.pass);

    if (!passwordMatch) {
      res.send({ status: 1, message: "Invalid password" });
      return;
    }
    const token = jwt.sign(
      {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET
    );

    res.send({ status: 0, token, message: "Login successful" });
  } catch (error) {
    res.send({ status: 1, message: "Internal server error" });
  }
};

module.exports = login;
