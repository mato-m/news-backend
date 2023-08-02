const pool = require("../../dbConfig.js");

const getArtTag = async (req, res) => {
  const { tag } = req.params;

  if (!tag) {
    res.send({ status: 4, message: "Tag name is required" });
    return;
  }

  const client = await pool.connect();
  try {
    const query =
      "SELECT art_id,art_title,art_img FROM newz.article WHERE art_id IN (SELECT art_id FROM newz.tags WHERE tag = $1) ORDER BY art_time DESC";
    const result = await client.query(query, [tag]);

    const articles = result.rows;
    res.send({ status: 0, articles });
  } catch (error) {
    res.send({ status: 1, message: "Error while fetching articles by tag" });
  } finally {
    client.release();
  }
};

module.exports = getArtTag;
