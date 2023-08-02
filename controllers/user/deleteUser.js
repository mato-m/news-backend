const pool = require("../../dbConfig.js");

const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (req.user.user_id !== user_id) {
      res.send({
        status: 2,
        message: "Unauthorized: You can only delete your own account.",
      });
      return;
    }

    const deleteUserQuery = `
      DELETE FROM newz.usr
      WHERE user_id = $1;
    `;

    await pool.query(deleteUserQuery, [user_id]);

    res.send({
      status: 0,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error while deleting user:", error);
    res.send({
      status: 1,
      message: "Failed to delete user",
    });
  }
};

module.exports = deleteUser;
