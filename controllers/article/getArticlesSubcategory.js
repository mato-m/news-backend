const pool = require("../../dbConfig.js");

const getArticlesSubcategory = async (req, res) => {
  try {
    const { sc_id } = req.params;
    const articlesQuery = `
      SELECT art_id,art_title,art_img,art_time FROM newz.article WHERE art_sc = $1 ORDER BY art_time DESC;
    `;

    const subcategoryQuery = `
      SELECT sc_name FROM newz.subcat WHERE sc_id = $1;
    `;

    const articlesResult = await pool.query(articlesQuery, [sc_id]);
    const articles = articlesResult.rows;

    const subcategoryResult = await pool.query(subcategoryQuery, [sc_id]);
    const subcategoryName = subcategoryResult.rows[0]?.sc_name;

    if (!subcategoryName) {
      res.send({
        status: 1,
        message: "Subcategory not found",
      });
      return;
    }

    res.send({
      status: 0,
      subcategoryName,
      articles,
    });
  } catch (error) {
    console.error("Error while fetching articles in subcategory:", error);
    res.send({
      status: 1,
      message: "Failed to fetch articles in subcategory",
    });
  }
};

module.exports = getArticlesSubcategory;
