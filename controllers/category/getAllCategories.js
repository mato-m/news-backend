const pool = require("../../dbConfig.js");

const getAllCategories = async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM newz.cat ORDER BY cat_name"
    );
    const categories = result.rows;
    res.send({ status: 0, categories });
  } catch (error) {
    res.send({ status: 1, message: "Error while fetching categories" });
  } finally {
    client.release();
  }
};

module.exports = getAllCategories;
