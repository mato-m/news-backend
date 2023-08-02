const pool = require("../../dbConfig");

const getLatestArticles = async (req, res) => {
  try {
    const latestArticlesByCategoryQuery = `
      SELECT
        cat.cat_id,
        cat.cat_name,
        art.art_id,
        art.art_title,
        art.art_img,
        art.art_time
      FROM (
        SELECT
          a.cat_id,
          a.art_id,
          a.art_title,
          a.art_img,
          a.art_time,
          ROW_NUMBER() OVER (PARTITION BY a.cat_id ORDER BY a.art_time DESC) AS rn
        FROM (
          SELECT
            c.cat_id,
            c.cat_name,
            a.art_id,
            a.art_title,
            a.art_img,
            a.art_time
          FROM newz.article AS a
          INNER JOIN newz.subcat AS sc ON a.art_sc = sc.sc_id
          INNER JOIN newz.cat AS c ON sc.cat_id = c.cat_id
        ) AS a
      ) AS art
      INNER JOIN newz.cat AS cat ON art.cat_id = cat.cat_id
      WHERE art.rn <= 5
      ORDER BY art.cat_id, art.art_time DESC;
    `;

    const latestArticlesQuery = `
      SELECT
        a.art_id,
        a.art_title,
        a.art_img,
        a.art_time
      FROM newz.article AS a
      ORDER BY a.art_time DESC
      LIMIT 5;
    `;

    const resultByCategory = await pool.query(latestArticlesByCategoryQuery);
    const resultOverall = await pool.query(latestArticlesQuery);

    const latestArticlesByCategory = resultByCategory.rows;
    const latestArticlesOverall = resultOverall.rows;

    res.send({
      status: 0,
      latestArticlesByCategory,
      latestArticlesOverall,
    });
  } catch (error) {
    console.error("Error while fetching latest articles:", error);
    res.send({
      status: 1,
      message: "Failed to fetch latest articles",
    });
  }
};

module.exports = getLatestArticles;
