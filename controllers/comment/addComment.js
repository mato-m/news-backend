const pool = require("../../dbConfig.js");

const addComment = async (req, res) => {
  const { comment, art_id } = req.body;
  const user_id = req.user.user_id;

  if (!comment || !art_id) {
    res.send({ status: 1, message: "Comment and art_id are required fields." });
    return;
  }

  if (comment.trim().length < 1 || comment.trim().length > 299) {
    res.send({
      status: 1,
      message: "Comment text should be between 1 and 299 characters.",
    });
    return;
  }

  try {
    const client = await pool.connect();

    const insertCommentQuery = `
      INSERT INTO newz.comment (art_id, user_id, text)
      VALUES ($1, $2, $3)
      RETURNING comment_id
    `;

    await client.query(insertCommentQuery, [art_id, user_id, comment.trim()]);

    client.release();

    res.send({ status: 0, message: "Comment added successfully." });
  } catch (error) {
    console.error("Error while adding comment:", error);
    res.send({ status: 1, message: "Failed to add comment." });
  }
};

module.exports = addComment;
