const pool = require("../../dbConfig.js");
const path = require("path");
const fs = require("fs");

const deleteArticle = async (req, res) => {
  const { art_id } = req.params;

  if (req.user.role !== 1) {
    res.send({
      status: 2,
      message: "Unauthorized. Only admins can delete articles.",
    });
    return;
  }

  try {
    const client = await pool.connect();

    await client.query("BEGIN");

    try {
      const getImageQuery = `
        SELECT art_img FROM newz.article
        WHERE art_id = $1
      `;

      const result = await client.query(getImageQuery, [art_id]);
      const art_img = result.rows[0]?.art_img;

      if (art_img) {
        const imagePath = path.join(__dirname, "../../dist/uploads", art_img);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      const deleteArticleQuery = `
        DELETE FROM newz.article
        WHERE art_id = $1
      `;

      await client.query(deleteArticleQuery, [art_id]);

      await client.query("COMMIT");

      res.send({ status: 0, message: "Article deleted successfully" });
    } catch (error) {
      await client.query("ROLLBACK");
      res.send({ status: 1, message: "Failed to delete article" });
    } finally {
      client.release();
    }
  } catch (error) {
    res.send({ status: 1, message: "Failed to delete article" });
  }
};

module.exports = deleteArticle;
