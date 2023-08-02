const pool = require("../../dbConfig.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.send({ status: 1, message: "All fields are required" });
    return;
  }

  if (
    !/^[\w\.-]+@[\w\.-]+\.\w+$/.test(email) ||
    email.length < 1 ||
    email.length > 40
  ) {
    res.send({ status: 1, message: "Invalid email format or length" });
    return;
  }

  if (username.length < 1 || username.length > 30) {
    res.send({ status: 1, message: "Invalid username length" });
    return;
  }

  if (password.length < 8 || password.length > 30) {
    res.send({ status: 1, message: "Invalid password length" });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const createUserQuery =
      "INSERT INTO newz.usr (username, email, pass) VALUES ($1, $2, $3) RETURNING *";
    const createUserValues = [username.trim(), email.trim(), hashedPassword];
    const userResult = await pool.query(createUserQuery, createUserValues);
    const user = userResult.rows[0];

    const token = jwt.sign(
      {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET
    );

    res.send({ status: 0, token, message: "Registration successful" });
  } catch (error) {
    console.log(error);
    res.send({ status: 1, message: "Internal server error" });
  }
};

module.exports = register;
