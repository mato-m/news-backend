const pool = require("../../dbConfig.js");

const getOneArticle = async (req, res) => {
  try {
    const { art_id } = req.params;
    const articleDetailsQuery = `
      SELECT
        a.art_id,
        a.art_title,
        a.art_md,
        a.art_time,a.art_img,
        u.username AS author_username,
        cat.cat_name AS category,cat.cat_id,
        subcat.sc_name AS subcategory,subcat.sc_id
      FROM newz.article AS a
      INNER JOIN newz.usr AS u ON a.author = u.user_id
      INNER JOIN newz.subcat AS subcat ON a.art_sc = subcat.sc_id
      INNER JOIN newz.cat AS cat ON subcat.cat_id = cat.cat_id
      WHERE a.art_id = $1;
    `;

    const tagsQuery = `
      SELECT
        *
      FROM newz.tags AS t
      WHERE t.art_id = $1;
    `;

    const commentsQuery = `
    SELECT
      com.*,
      u.username
    FROM newz.comment AS com
    INNER JOIN newz.usr AS u ON com.user_id = u.user_id
    WHERE com.art_id = $1 ORDER BY com.time DESC;
  `;

    const articleResult = await pool.query(articleDetailsQuery, [art_id]);
    const tagsResult = await pool.query(tagsQuery, [art_id]);
    const commentsResult = await pool.query(commentsQuery, [art_id]);

    const articleDetails = articleResult.rows[0];
    const tags = tagsResult.rows.map((row) => row.tag);
    const comments = commentsResult.rows;

    if (!articleDetails) {
      res.send({
        status: 1,
        message: "Article not found",
      });
      return;
    }

    res.send({
      status: 0,
      articleDetails,
      tags,
      comments,
    });
  } catch (error) {
    console.error("Error while fetching article details:", error);
    res.send({
      status: 1,
      message: "Failed to fetch article details",
    });
  }
};

module.exports = getOneArticle;
