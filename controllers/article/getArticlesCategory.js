const pool = require("../../dbConfig.js");

const getArticlesCategory = async (req, res) => {
  try {
    const { cat_id } = req.params;
    const articlesQuery = `
      SELECT *
      FROM newz.article AS a
      INNER JOIN newz.subcat AS sc ON a.art_sc = sc.sc_id
      WHERE sc.cat_id = $1 ORDER BY a.art_time DESC;
    `;

    const categoryQuery = `
      SELECT cat_name
      FROM newz.cat
      WHERE cat_id = $1;
    `;

    const articlesResult = await pool.query(articlesQuery, [cat_id]);
    const articles = articlesResult.rows;

    const categoryResult = await pool.query(categoryQuery, [cat_id]);
    const categoryName = categoryResult.rows[0]?.cat_name;

    if (!categoryName) {
      res.send({
        status: 1,
        message: "Category not found",
      });
      return;
    }

    res.send({
      status: 0,
      categoryName,
      articles,
    });
  } catch (error) {
    console.error("Error while fetching articles in category:", error);
    res.send({
      status: 1,
      message: "Failed to fetch articles in category",
    });
  }
};

module.exports = getArticlesCategory;
