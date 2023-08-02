const pool = require("../../dbConfig.js");

const removeComment = async (req, res) => {
  const { comment_id } = req.params;
  const user_id = req.user.user_id;

  try {
    const client = await pool.connect();

    const findCommentQuery =
      "SELECT user_id FROM newz.comment WHERE comment_id = $1";
    const commentResult = await client.query(findCommentQuery, [comment_id]);

    if (commentResult.rows.length === 0) {
      client.release();
      return res.send({ status: 1, message: "Comment not found." });
    }

    const commentuser_id = commentResult.rows[0].user_id;

    if (commentuser_id !== user_id && !req.user.role === 1) {
      client.release();
      return res.send({
        status: 1,
        message:
          "Unauthorized. Only the comment owner or admin can delete the comment.",
      });
    }

    const deleteCommentQuery = "DELETE FROM newz.comment WHERE comment_id = $1";
    await client.query(deleteCommentQuery, [comment_id]);

    client.release();

    res.send({ status: 0, message: "Comment deleted successfully." });
  } catch (error) {
    res.send({ status: 1, message: "Failed to remove comment." });
  }
};

module.exports = removeComment;
