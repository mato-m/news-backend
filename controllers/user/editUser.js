const pool = require("../../dbConfig.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const editUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { username, email, pass } = req.body;

    if (req.user.user_id !== user_id) {
      res.send({
        status: 2,
        message: "Unauthorized: You can only edit your own account.",
      });
      return;
    }

    if (
      email &&
      (!/^[\w\.-]+@[\w\.-]+\.\w+$/.test(email) ||
        email.length < 1 ||
        email.length > 40)
    ) {
      res.send({ status: 1, message: "Invalid email format or length" });
      return;
    }

    if (username && (username.length < 1 || username.length > 30)) {
      res.send({ status: 1, message: "Invalid username length" });
      return;
    }

    if (pass && (pass.length < 8 || pass.length > 30)) {
      res.send({ status: 1, message: "Invalid password length" });
      return;
    }

    const getUserQuery = `
      SELECT * FROM newz.usr
      WHERE user_id = $1;
    `;

    const getUserResult = await pool.query(getUserQuery, [user_id]);

    if (getUserResult.rows.length === 0) {
      res.send({
        status: 1,
        message: "User not found",
      });
      return;
    }

    const updateValues = {};
    const updateParams = [user_id];

    if (username) {
      updateValues.username = username.trim();
    }

    if (email) {
      updateValues.email = email.trim();
    }

    if (pass) {
      updateValues.pass = await bcrypt.hash(pass.trim(), 10);
    }

    let updateQuery = `UPDATE newz.usr SET`;
    const updateKeys = Object.keys(updateValues);

    updateKeys.forEach((key, index) => {
      updateQuery += ` ${key} = $${index + 2}`;
      updateParams.push(updateValues[key]);

      if (index !== updateKeys.length - 1) {
        updateQuery += ",";
      }
    });

    updateQuery += ` WHERE user_id = $1 RETURNING *;`;

    const result = await pool.query(updateQuery, updateParams);

    const updatedUser = result.rows[0];

    const token = jwt.sign(
      {
        user_id: updatedUser.user_id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
      },
      process.env.JWT_SECRET
    );

    res.send({
      status: 0,
      message: "User details updated successfully",
      token,
    });
  } catch (error) {
    console.error("Error while editing user:", error);
    res.send({
      status: 1,
      message: "Failed to edit user",
    });
  }
};

module.exports = editUser;
